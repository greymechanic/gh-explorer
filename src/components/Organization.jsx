import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const GET_GH_ORGANIZATION = gql`
  query Organization($organization: String!) {
    organization(login: $organization) {
      name
      repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 12) {
        edges {
          node {
            name
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
      if (loading) return "loading";
      if (error) return `Error!: ${error}`;
      return (
        <div>
          <h3>{data.organization.name}</h3>
          <p>Repositories</p>
          <ul>
            {data.organization.repositories.edges.map((repo, i) => {
              return <li key={i}>{repo.node.name}</li>;
            })}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Organization;
