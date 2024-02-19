// PoolContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fetchPoolIds } from "~~/utils/request";

const PoolContext = createContext<string[]>([]);

export const PoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [poolIds, setPoolIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPoolIds = await fetchPoolIds();

        //   console.log(fetchedPoolIds)
        setPoolIds(fetchedPoolIds);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return <PoolContext.Provider value={poolIds}>{children}</PoolContext.Provider>;
};

export const usePools = () => useContext(PoolContext);
