import { useState } from "react";
import CreatePoolSteps from "./CreatePoolSteps";
import SelectStrategy from "./strategy/SelectStrategy";
import InitData from "./strategy/InitData";


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
    
    const [strategyName, setStrategyName] = useState<string>("");
    const [strategyAddress, setStrategyAddress] = useState<string>("");
    const [strategyDeployStatus, setStrategyDeployStatus] = useState<string>("");
    const [strategyInitData, setStrategyInitData] = useState<any>({});
    const [currentStep, setCurrentStep] = useState<string>("1");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const handleStrategySelect = (name: string, address: string) => {
        setStrategyName(name);
        setStrategyAddress(address);
      
    };


    const handleInitData = (initData: any) => {
        setStrategyInitData(initData);
      };

    const handleNextStep = () => {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(String(parseInt(currentStep) + 1));
    };

  return (
    <div className="p-6">
      <CreatePoolSteps currentStep={currentStep} completedSteps={completedSteps} />

      <div className="flex justify-center p-4">
        {currentStep === "1" && (
          <SelectStrategy
            strategyName={strategyName}
            strategyAddress={strategyAddress}
            strategyInitData={strategyInitData}
            onStrategySelect={handleStrategySelect}
            onNextStep={handleNextStep}
          />
        )}
        {currentStep === "2" && strategyAddress && (
          <InitData strategyAddress={strategyAddress} strategyName={strategyName} onInitDataSubmit={handleInitData} onNextStep={handleNextStep} />
        )}
      </div>
    </div>
  );
};

export default CreatePoolContainer;
