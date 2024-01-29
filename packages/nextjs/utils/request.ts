// request.ts
import { GraphQLClient } from "graphql-request";
import { getProfileById, getProfilesQuery } from './query';
import { getIPFSClient } from "~~/services/ipfs";



const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || ''; 
const client = new GraphQLClient(graphqlEndpoint);
const IPFSClient = getIPFSClient();


export const fetchProfilesQuery = async (first: number, skip?: number) => {
  try {
    const data = await client.request(getProfilesQuery, {
      first,
      skip,
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





