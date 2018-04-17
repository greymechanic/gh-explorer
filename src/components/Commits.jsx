import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import "./Commits.css";

const GET_GH_COMMITS = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 5) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  messageHeadline
                  oid
                  resourcePath
                  author {
                    name
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default class Commits extends React.Component {
  render() {
    const {repo} = this.props;
    return (
      <Query
        query={GET_GH_COMMITS}
        variables={repo}
        notifyOnNetworkStatusChange
      >
        {({loading, error, data, refetch}) => {
          if (loading)
            return <span className="extras loading">Loading...</span>;
          if (error)
            return <span className="extras error">{`Error!: ${error}`}</span>;
          return (
            <ul className="commit-list">
              <h6>Recent Commits</h6>
              {data.repository.ref.target.history.edges.map((commit, i) => {
                return (
                  <li key={i}>
                    <a
                      href={`http://github.com${commit.node.resourcePath}`}
                      target="_blank"
                    >
                      <div className="message">
                        {commit.node.messageHeadline}
                      </div>
                      <div className="additional">
                        {commit.node.author.name} | {commit.node.author.date}
                      </div>
                      <div className="additional">{commit.node.oid}</div>
                    </a>
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Query>
    );
  }
}
