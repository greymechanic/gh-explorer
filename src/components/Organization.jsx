import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import classnames from "classnames";
import "./Organization.css";
import Commits from "./Commits";

const GET_GH_ORGANIZATION = gql`
  query Organization($organization: String!) {
    organization(login: $organization) {
      name
      repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 12) {
        edges {
          node {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export default class Organization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {highlightedRepo: {name: "", owner: ""}};
  }

  showCommits = (repositoryName, repositoryOwner) => {
    const clearSelection = this.state.highlightedRepo.name === repositoryName;
    this.setState({
      highlightedRepo: clearSelection
        ? {name: "", owner: ""}
        : {name: repositoryName, owner: repositoryOwner},
    });
  };

  render() {
    const {organization} = this.props;
    return (
      <Query
        query={GET_GH_ORGANIZATION}
        variables={{organization}}
        notifyOnNetworkStatusChange
      >
        {({loading, error, data, refetch}) => {
          if (loading) return "Loading...";
          if (error) return `Error!: ${error}`;
          return (
            <div className="organization-wrapper">
              <h2>{data.organization.name}</h2>
              <small>Popular Repositories</small>
              <ul class="repo-list">
                {data.organization.repositories.edges.map((repo, i) => {
                  const isSelected =
                    repo.node.name === this.state.highlightedRepo.name;
                  return (
                    <React.Fragment>
                      <li
                        key={i}
                        className={classnames({
                          active: isSelected,
                        })}
                        onClick={() =>
                          this.showCommits(
                            repo.node.name,
                            repo.node.owner.login
                          )
                        }
                      >
                        {repo.node.name}
                        <span>
                          {repo.node.stargazers.totalCount} stargazers
                        </span>
                        <span className="trigger">
                          {isSelected ? "collapse" : "browse commits"}
                        </span>
                      </li>
                      {isSelected ? (
                        <Commits repo={this.state.highlightedRepo} />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}
