import { formatTime } from "./formateTime";
import { formatEther } from "viem";
import { PoolData } from "~~/types/types";
import { fetchPoolData } from "~~/utils/request";

export const fetchPools = async (
  poolIds: string[],
  allo: any,
  skip: number,
  orderBy: string,
  sortBy: string,
): Promise<PoolData[]> => {
  const fetchedPools: PoolData[] = [];

  // TODO: Make func calls consistent
  const additionalPoolData = await fetchPoolData(orderBy, sortBy, poolIds.length, skip);
  // console.log(additionalPoolData, formatEther(additionalPoolData[0].amount))

  for (let i = 0; i < poolIds.length; i++) {
    const poolId = poolIds[i];

    try {
      const pool = poolId && (await allo.getPool(Number(poolId)));

      // Get the corresponding additional data for the current pool
      const additionalDataForPool = additionalPoolData[i];

      const poolData: PoolData = {
        id: poolId,
        profileId: pool.profileId,
        strategy: pool.strategy,
        token: pool.token,
        metadata: pool.metadata,
        managerRole: additionalDataForPool.managerRole["accounts"],
        adminRole: pool.adminRole,
        amount: formatEther(additionalDataForPool.amount),
        createdAt: formatTime(additionalDataForPool.createdAt),
        updatedAt: additionalDataForPool.updatedAt,
      };
      fetchedPools.push(poolData);
    } catch (error) {
      // Handle error for a specific pool
      console.log(poolId, error);
    }
  }

  return fetchedPools;
};

// Define a function to fetch strategy information
// const fetchStrategyInfo = async (strategyAddress: string): Promise<any> => {

//     // Return the retrieved information
//     return {
//         // strategyType,
//         // poolPeriod,
//         // isActive
//     };
// };
