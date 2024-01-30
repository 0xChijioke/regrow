// query.ts
import { gql } from "graphql-request";

export const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";



// Query to fetch profiles
export const getProfilesQuery = gql`
query GetProfiles($first: Int!, $skip: Int, $orderBy: String, $orderDirection: String) {
  profiles(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
    ) {
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

// Query to search for profiles
export const searchProfilesQuery = gql`
  query SearchProfiles($first: Int!, $skip: Int!, $search: String, $address: String) {
    profiles(
      first: $first
      skip: $skip
      where: {
        OR: [
          { name_contains: $search }
          { owner: { id: $address } }
          { members: { accounts: { id: $address } } }
          { anchor: { id: $address } }
        ]
      }
    ) {
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

export const getProfilesByOwnerQuery = gql`
  query getProfilesByOwnerQuery($owner: String!) {
    profilesByOwner(owner: $owner) {
      profileId
      name
      owner
      createdAt
      anchor
    }
  }
`;