// request.ts
import { getPoolByIdQuery, getPoolsQuery, getProfileById, getProfilesQuery, searchProfilesQuery } from "./query";
import { Pool } from "@allo-team/allo-v2-sdk/dist/types";
import { GraphQLClient } from "graphql-request";
import { getIPFSClient } from "~~/services/ipfs";

// const PINATA_API = process.env.NEXT_PUBLIC_PINATA_API_KEY
// const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";
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
      address,
    });

    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

export const fetchProfileById = async (id: string): Promise<any> => {
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
