"use client";

import { useState } from "react";
import PoolCard from "./PoolCard";
import { shuffle } from "lodash";
import { usePools } from "~~/contexts/poolConext";
import { PoolData } from "~~/types/types";

const Pools: React.FC = () => {
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const poolContext = usePools();
  const PAGE_SIZE = 9;

  if (!poolContext || !poolContext.pools) {
    // Handle the case when pools are not available
    return <div>No pools available</div>;
  }

  const { pools, setPools, fetchMorePools, setSortBy, setOrderBy } = poolContext;
  // console.log(pools);

  const handleOrderDirectionToggle = async () => {
    // Toggle order direction
    const newOrderDirection = orderDirection === "asc" ? "desc" : "asc";
    setOrderBy(newOrderDirection);
    setOrderDirection(newOrderDirection);
  };

  const handleShuffle = () => {
    // Shuffle the profiles array and update the state
    setPools(prevPools => shuffle(prevPools));
  };

  return (
    <div>
      {pools.length > 0 && (
        <div className="flex-row pt-6 pr-4 flex justify-end items-center gap-x-4">
          <div>
            <select
              className="select select-sm select-bordered w-full max-w-xs"
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="createdAt">Created</option>
              <option value="id">ID</option>
              <option value="token">Token</option>
              <option value="amount">Amount</option>
              <option value="updatedAt">Updated</option>
              {/* Add more */}
            </select>
          </div>

          <div>
            <button onClick={handleOrderDirectionToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </button>
          </div>

          <div>
            <button onClick={handleShuffle}>Shuffle</button>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-fit px-8 lg:px-0 lg:grid lg:grid-cols-3">
          {pools.length === 0
            ? // Render skeleton cards when loading
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div className="animate-pulse card w-90% lg:w-80 m-3 h-80 glass" key={index}></div>
              ))
            : pools.map((pool: PoolData) => <PoolCard key={pool.id} pool={pool} />)}
        </div>
      </div>

      {pools.length > 0 && (
        <div className="items-center justify-center flex">
          <button onClick={fetchMorePools}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" w-14 h-14"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pools;
