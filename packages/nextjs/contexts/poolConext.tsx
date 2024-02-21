// PoolContext.tsx
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { fetchPools } from "~~/helpers/fetchPools";
import useSDK from "~~/hooks/allo/useSDK";
import { PoolData } from "~~/types/types";
import { fetchPoolIds } from "~~/utils/request";

interface IPoolContextProps {
  pools: PoolData[];
  setPools: Dispatch<SetStateAction<PoolData[]>>;
  fetchMorePools: () => void;
  setSortBy: (sortBy: string) => void;
  setOrderBy: (orderBy: string) => void;
}

const PoolContext = createContext<IPoolContextProps | undefined>(undefined);

export const PoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [orderBy, setOrderBy] = useState<string>("desc");
  const [skip, setSkip] = useState<number>(0);
  const { allo } = useSDK();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPoolIds: any[] = await fetchPoolIds(9, skip, sortBy, orderBy);
        const arrayOfIds = fetchedPoolIds.map((obj: { id: string }) => obj.id);
        const fetchedPools = await fetchPools(arrayOfIds, allo, skip, orderBy, sortBy);

        // console.log(fetchedPools);
        setPools(fetchedPools);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, [skip, orderBy, sortBy, allo]);

  const fetchMorePools = () => {
    setSkip(prevSkip => prevSkip + 9);
  };

  const value = {
    pools,
    setPools,
    fetchMorePools,
    setSortBy,
    setOrderBy,
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const usePools = () => useContext(PoolContext);
