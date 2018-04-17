import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import classnames from "classnames";
import "./Organization.css";

const GET_GH_ORGANIZATION = gql`
  query Organization($organization: String!) {
    organization(login: $organization) {
      name
      repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 12) {
        edges {
          node {
            name
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

    this.state = {highlightedRepo: ""};
  }

  showCommits = repositoryName => {
    this.setState({highlightedRepo: repositoryName});
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
              <ul>
                {data.organization.repositories.edges.map((repo, i) => {
                  return (
                    <li
                      key={i}
                      className={classnames({
                        active: repo.node.name === this.state.highlightedRepo,
                      })}
                      onClick={() => this.showCommits(repo.node.name)}
                    >
                      {repo.node.name}
                      <span>{repo.node.stargazers.totalCount} stargazers</span>
                      <span className="trigger">browse commits</span>
                    </li>
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
