import { useConfig } from "wagmi";

export const useConfigData = () => {
  const { chains } = useConfig();
  const { id: chainIdConfig, rpcUrls } = chains?.[0] || {};
  const rpcConfig = rpcUrls?.default?.http?.[0];

  return {
    chainIdConfig,
    rpcConfig,
  };
};
