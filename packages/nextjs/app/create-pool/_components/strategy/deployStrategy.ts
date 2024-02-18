import { getWalletClient, waitForTransaction } from "@wagmi/core";
import { strategyMG } from "~~/app/_components/sdk";

// import { notification } from "~~/utils/scaffold-eth";
// import { TxnNotification } from "../CreatePoolContainer";

// Strategy factory function
export const deployStrategy = async (
  strategyType: string,
  rpcConfig: string | undefined,
  chainIdConfig: number | undefined,
  address: string,
  publicClient: any,
) => {
  const walletClient = await getWalletClient({ chainId: chainIdConfig });
  let strategyAddress;

  try {
    const deployParams = strategyMG.getDeployParams(`${strategyType}`);
    console.log("deployParams", deployParams);

    const estimateGas =
      address &&
      (await publicClient.estimateGas({
        data: deployParams.bytecode as `0x${string}`,
        account: address,
      }));
    console.log("Estimated Gas", Number(estimateGas));

    // Display loading notification before deployment
    // notificationId = notification.loading(<TxnNotification message={`Deploying ${strategyType} Strategy`} />);

    const hash =
      walletClient &&
      (await walletClient.deployContract({
        abi: deployParams.abi,
        bytecode: deployParams.bytecode as `0x${string}`,
        args: [],
        gas: BigInt(2147273),
      }));
    console.log("hash", hash);

    const result = await waitForTransaction({
      hash: hash as `0x${string}`,
      chainId: chainIdConfig,
    });
    console.log("result", result);

    return { deployedStrategyAddress: result.contractAddress, estimateGas };
  } catch (e) {
    console.error(`Deploying ${strategyType} Strategy`, e);
  }

  return strategyAddress;
};
