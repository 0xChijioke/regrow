// query.ts
import { gql } from "graphql-request";

export const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";



// Query to fetch profiles
// export const getProfilesQuery = gql`
//   {
//     profiles(first: 10) {
//       createdAt
//       anchor
//       name
//       nonce
//       id
//       metadata {
//         pointer
//         protocol
//         id
//       }
//       updatedAt
//       owner {
//         id
//       }
//     }
//   }
// `;



export const getProfilesQuery = gql`
  query GetProfiles($first: Int!, $skip: Int!) {
    profiles(first: $first, skip: $skip) {
      createdAt
      anchor
      name
      nonce
      id
      metadata {
        pointer
        protocol
        id
      }
      updatedAt
      owner {
        id
      }
    }
  }
`;



export const getProfileById = gql`
  query GetProfileById($id: String!) {
    profile(id: $id) {
      id
      name
      nonce
      updatedAt
      owner {
        id
      }
      metadata {
        id
        pointer
        protocol
      }
      memberRole {
        id
        accounts(orderBy: id) {
          id
        }
      }
      anchor
      createdAt
    }
  }
`;