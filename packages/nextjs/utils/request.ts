// request.ts
import { GraphQLClient } from "graphql-request";
import { getProfileById, getProfilesQuery, searchProfilesQuery } from './query';
import { getIPFSClient } from "~~/services/ipfs";



const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || ''; 
const client = new GraphQLClient(graphqlEndpoint);
export const IPFSClient = getIPFSClient();


export const fetchProfilesQuery = async (first: number, skip?: number, orderBy?: string, orderDirection?: string) => {
  try {
    const data = await client.request(getProfilesQuery, {
      first,
      skip,
      orderBy,
      orderDirection,
    });

    
    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

export const searchProfiles = async (first: number, skip?: number, search?: string, address?: string) => {
  try {
    const data = await client.request(searchProfilesQuery, {
      first,
      skip,
      search,
      address
    });

    
    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};




export const fetchProfileById = async (id: string) => {
  const data = await client.request(getProfileById, {
      id,
  });
  return data;
};





