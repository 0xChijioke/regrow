import { useEffect, useState } from "react";
import CreatePoolSteps from "./CreatePoolSteps";
import SelectStrategy from "./strategy/SelectStrategy";
import InitData from "./strategy/InitData";
import CreatePool from "./CreatePool";
import { CreatePoolArgs, InitializeParams } from "@allo-team/allo-v2-sdk/dist/types";
import { Allo } from "@allo-team/allo-v2-sdk";
import { useConfig, usePublicClient } from "wagmi";
import { getWalletClient, sendTransaction } from "@wagmi/core";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";





/**
 * Custom notification content for TXs.
 */
export const TxnNotification = ({ message, blockExplorerLink }: { message: string; blockExplorerLink?: string }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a href={blockExplorerLink} target="_blank" rel="noreferrer" className="block link text-md">
          check out transaction
        </a>
      ) : null}
    </div>
  );
};

const CreatePoolContainer = ({ profileId }: { profileId: string }) => {
  const { chains } = useConfig();
  const publicClient = usePublicClient();
  const chainIdConfig = chains && chains[0].id;
  const rpcConfig = chains && chains[0].rpcUrls.default.http[0];
  // console.log(rpcConfig)

    
  const [strategyName, setStrategyName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<string>("1");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [poolName, setPoolName] = useState<string>("");
  const [poolData, setPoolData] = useState<CreatePoolArgs>({
    profileId: "",
    strategy: "",
    initStrategyData: "",
    token: '',
    amount: BigInt(0),
    metadata: {
      protocol: BigInt(1),
      pointer: 'bafybeid47tux23bnyljcgm3jw3ifimaojazgknnjre7m4pcaiw5gommvta', // placeholder
    },
    managers: [],
  });

  // useEffect to set profileId in poolData when the component mounts
  useEffect(() => {
    setPoolData((prevData) => ({
      ...prevData,
      profileId: profileId,
    }));
  }, [profileId]);
  
  const { writeAsync: createPoolWrite, isLoading: isCreatingPool, isMining } = useScaffoldContractWrite({
    contractName: 'ALLOPROXY',
    functionName: 'createPoolWithCustomStrategy',
    args: [
      poolData.profileId as `0x${string}`,
      poolData.strategy,
      poolData.initStrategyData as `0x${string}`,
      poolData.token,
      poolData.amount,
      poolData.metadata,
      poolData.managers,
    ],
    value: poolData.amount,
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log('Transaction blockHash', txnReceipt.blockHash);
    },
    onSuccess: data => {
      console.log(data)
    }
  });
    
  
  
  
  
  
  
  const handleStrategySelect = (name: string, address: string) => {
    setStrategyName(name);
    setPoolData((prevData) => ({ ...prevData, strategy: address }));   
      
    };


  const handleInitData = (initData: any) => {
    setPoolData((prevData) => ({ ...prevData, initStrategyData: initData }));
  };


  const handlePoolDataInput = (name: string, token: string, amount: bigint, managers: string[]) => {
    // Pool name and other field will be used to set ipfs metadata here
    setPoolName(name);


    setPoolData((prevData) => ({
      ...prevData,
      token: token,
      amount: amount,
      managers: managers,
    }));

    handleNextStep();
  };
  
  
  const handleNextStep = () => {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(String(parseInt(currentStep) + 1));
    };
    
    
    const handleCreatePool = async () => {
    const walletClient = await getWalletClient();
    // console.log("Creating pool with data:", poolData);
    

    // console.log(walletClient)
    try {
      const res = await createPoolWrite();
      console.log(res)
      // Additional logic after successful pool creation
    } catch (error) {
      console.error('Error creating pool:', error);
      // Handle error
    }

  
  };

  // console.log("pool data", poolData)

  return (
    <div className="p-6">
      <CreatePoolSteps currentStep={currentStep} completedSteps={completedSteps} />

      <div className="flex justify-center p-4">
        {currentStep === "1" && (
          <SelectStrategy
            strategyName={strategyName}
            strategyAddress={poolData.strategy}
            strategyInitData={poolData.initStrategyData}
            onStrategySelect={handleStrategySelect}
            onNextStep={handleNextStep}
          />
        )}
        {currentStep === "2" && poolData.strategy && (
          <InitData
            strategyAddress={poolData.strategy}
            strategyName={strategyName}
            onInitDataSubmit={handleInitData}
            handlePoolDataInput={handlePoolDataInput}
            onNextStep={handleNextStep} />
        )}
        {currentStep === "3" && poolData.initStrategyData && (
          <CreatePool
            poolData={poolData}
            name={poolName}
            onCreatePool={handleCreatePool} />
        )}
      </div>
    </div>
  );
};

export default CreatePoolContainer;
