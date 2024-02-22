// request.ts
import { graphqlEndpoint } from "./config";
import {
  // getActiveMicroGrantsQuery,
  getPoolByIdQuery,
  getPoolDataQuery,
  getPoolIdsQuery,
  getPoolsQuery,
  getProfileById,
  getProfilesQuery,
  searchProfilesQuery,
} from "./query";
import { Pool } from "@allo-team/allo-v2-sdk/dist/types";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(graphqlEndpoint);

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

export const fetchPoolIds = async (
  first?: number,
  skip?: number,
  orderBy?: string,
  orderDirection?: string,
): Promise<any[]> => {
  try {
    const data: any = await client.request(getPoolIdsQuery, {
      first,
      skip,
      orderBy,
      orderDirection,
    });
    const poolIds = data.pools || [];

    return poolIds;
  } catch (error) {
    console.error("Error fetching pool IDs:", error);
    throw error;
  }
};

// Function to fetch additional pool information
export const fetchPoolData = async (orderDirection: string, orderBy: string, first?: number, skip?: number) => {
  try {
    const additionalData: any = await client.request(getPoolDataQuery, {
      orderDirection,
      orderBy,
      first,
      skip,
    });
    return additionalData.pools || [];
  } catch (error) {
    console.error("Error fetching additional pool data:", error);
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

// // Function to fetch micro grants pools
// export const fetchMicroGrantsPools = async () => {
//   try {
//     const microGrantsPoolsData: any = await client.request(getActiveMicroGrantsQuery);
//     return microGrantsPoolsData || [];
//   } catch (error) {
//     console.error("Error fetching micro grants pools:", error);
//     throw error;
//   }
// };
