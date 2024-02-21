import { useConfigData } from "./useConfigData";
import { Allo, MicroGrantsStrategy, Registry } from "@allo-team/allo-v2-sdk";

const useSDK = () => {
  const { chain, rpcConfig } = useConfigData();

  const allo =
    chain &&
    rpcConfig &&
    new Allo({
      chain: chain,
      rpc: rpcConfig,
    });

  const registry =
    chain &&
    rpcConfig &&
    new Registry({
      chain: chain,
      rpc: rpcConfig,
    });

  const strategyMG =
    chain &&
    rpcConfig &&
    new MicroGrantsStrategy({
      chain: chain,
      rpc: rpcConfig,
    });

  return { allo, registry, strategyMG };
};

export default useSDK;
