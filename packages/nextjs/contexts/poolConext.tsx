// PoolContext.tsx
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
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
  const prevFilters = useRef({ sortBy, orderBy });

  // Fetch pool ids
  const {
    data: poolIds,
    // isLoading: isLoadingPoolIds
  } = useQuery(["poolIds", sortBy, orderBy, skip], () => fetchPoolIds(9, skip, sortBy, orderBy));
  // console.log("fetched pool ids",poolIds)

  const poolIdsArray = poolIds?.map(obj => obj.id) || [];

  const {
    data: fetchedPools,
    // refetch,
    // isLoading: isLoadingPools
  } = useQuery(["pools", poolIdsArray, sortBy, orderBy, skip], () =>
    poolIdsArray.length > 0 ? fetchPools(poolIdsArray, allo, skip, orderBy, sortBy) : undefined,
  );
  // console.log("fetched pools", fetchedPools)

  useEffect(() => {
    if (prevFilters.current.sortBy !== sortBy || prevFilters.current.orderBy !== orderBy) {
      console.log(prevFilters);
      // Reset the pools array if filters have changed
      fetchedPools && setPools(fetchedPools);
    } else if (fetchedPools) {
      // Append the newly fetched pools to the existing ones
      setPools(prevPools => [...prevPools, ...fetchedPools]);
    }

    // Update the previous filters
    prevFilters.current = { sortBy, orderBy };
  }, [fetchedPools, sortBy, orderBy]);

  const value = useMemo(() => {
    const fetchMorePools = async () => {
      setSkip(prevSkip => prevSkip + 9);
    };

    return {
      pools,
      setPools,
      fetchMorePools,
      setSortBy,
      setOrderBy,
    };
  }, [pools, setPools, setSkip, setSortBy, setOrderBy]);

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const usePools = () => useContext(PoolContext);
