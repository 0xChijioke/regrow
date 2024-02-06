import { useState } from "react";
import CreatePoolSteps from "./CreatePoolSteps";
import SelectStrategy from "./strategy/SelectStrategy";
import InitData from "./strategy/InitData";

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
        {currentStep === "2" && (
          <InitData strategyAddress={strategyAddress} onInitDataSubmit={handleInitData} onNextStep={handleNextStep} />
        )}
      </div>
    </div>
  );
};

export default CreatePoolContainer;
