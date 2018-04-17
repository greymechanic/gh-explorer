import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
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

const Organization = ({organization}) => (
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
                <li key={i}>
                  {repo.node.name}
                  <span>{repo.node.stargazers.totalCount} stargazers</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Organization;
