import { MicroGrantsStrategy } from "@allo-team/allo-v2-sdk";
import { getWalletClient, waitForTransaction } from "@wagmi/core";
import { usePublicClient, useAccount, useBalance } from "wagmi";
import { useAccountBalance } from "~~/hooks/scaffold-eth";

// Strategy factory function
export const deployStrategy = async (strategyType: string, rpcConfig: string | undefined, chainIdConfig: number | undefined) => {
  const { address } = useAccount();
  
  const value = data.value
  //    ^? const value: bigint
  
  const publicClient = usePublicClient();
  const walletClient = await getWalletClient({ chainId: chainIdConfig });
  let strategyAddress;
  
  
  try {
    let strategy;
    switch (strategyType) {
      case "MicroGrantsv1":
        strategy = new MicroGrantsStrategy({
          chain: Number(chainIdConfig),
          rpc: rpcConfig,
        });
        break;
        // more cases for other strategies
        
        default:
          throw new Error("Unsupported strategy type");
        }
        console.log("Strategy", strategy)
        
        const deployParams = strategy.getDeployParams(`${strategyType}`);
        console.log("deployParams", deployParams)
        
    
        const { balance } = useAccountBalance(address)
        

    const estimateGas = address && await publicClient.estimateGas({
      to: '0x',
      data: deployParams.bytecode as `0x${string}`,
      account: address
    });
    console.log("Estimated Gas", estimateGas);

    const hash = await walletClient!.deployContract({
      abi: deployParams.abi,
      bytecode: deployParams.bytecode as `0x${string}`,
      args: [],
      
    });
    console.log("hash", hash)

    const result = await waitForTransaction({
      hash: hash,
      chainId: chainIdConfig,
    });
    console.log("result", result)

    strategyAddress = result.contractAddress!;
  } catch (e) {
    console.error(`Deploying ${strategyType} Strategy`, e);
  }

  return strategyAddress;
};
