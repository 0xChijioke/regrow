// request.ts
import { GraphQLClient } from "graphql-request";
import { getPoolByIdQuery, getPoolsQuery, getProfileById, getProfilesQuery, searchProfilesQuery } from './query';
import { getIPFSClient } from "~~/services/ipfs";
import PinataSDK from "@pinata/sdk";
import { ProfileDetail } from "~~/types/types";
import { Pool } from "@allo-team/allo-v2-sdk/dist/types";

const PINATA_API = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET


export const pinata = new PinataSDK({ pinataApiKey: PINATA_API, pinataSecretApiKey: PINATA_SECRET });

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || ''; 
const client = new GraphQLClient(graphqlEndpoint);
export const IPFSClient = getIPFSClient();





// ===============================
// ========== Profiles ==========
// ===============================

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




export const fetchProfileById = async (id: string): Promise<ProfileDetail | null> => {
  const data: any = await client.request(getProfileById, {
      id,
  });
  return data;
};


// ===============================
// ============ Pools ============
// ===============================




export const fetchPoolsQuery = async (first: number, skip?: number, orderBy?: string, orderDirection?: string) => {
  try {
    const data = await client.request(getPoolsQuery, {
      first,
      skip,
      orderBy,
      orderDirection,
    });
    
    return data;
  } catch (error) {
    console.error("Error fetching pools:", error);
    throw error;
  }
};

export const fetchPoolById = async (id: string): Promise<Pool | null> => {
  try {
    const data: any = await client.request(getPoolByIdQuery, {
      id,
    });
    return data;
  } catch (error) {
    console.error("Error fetching pool by ID:", error);
    throw error;
  }
};
