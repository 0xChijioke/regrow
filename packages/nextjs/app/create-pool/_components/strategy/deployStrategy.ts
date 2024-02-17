import { MicroGrantsStrategy } from "@allo-team/allo-v2-sdk";
import { getWalletClient, waitForTransaction } from "@wagmi/core";
import { notification } from "~~/utils/scaffold-eth";
import { TxnNotification } from "../CreatePoolContainer";

// Strategy factory function
export const deployStrategy = async(
  strategyType: string,
  rpcConfig: string | undefined,
  chainIdConfig: number | undefined,
  address: string,
  publicClient: any
) => {
  const walletClient = await getWalletClient({ chainId: chainIdConfig });
  let strategyAddress;
  
  let notificationId = null; 
  
  
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


    const estimateGas = address && await publicClient.estimateGas({
      data: deployParams.bytecode as `0x${string}`,
      account: address
    });
    console.log("Estimated Gas", Number(estimateGas));

    // Display loading notification before deployment
    // notificationId = notification.loading(<TxnNotification message={`Deploying ${strategyType} Strategy`} />);


    const hash = await walletClient!.deployContract({
      abi: deployParams.abi,
      bytecode: deployParams.bytecode as `0x${string}`,
      args: [],
      gas: BigInt(2147273),
      
    });
    console.log("hash", hash)

    const result = await waitForTransaction({
      hash: hash,
      chainId: chainIdConfig,
    });
    console.log("result", result)

    return { deployedStrategyAddress: result.contractAddress!, estimateGas };
  } catch (e) {
    console.error(`Deploying ${strategyType} Strategy`, e);
  }

  return strategyAddress;
};
