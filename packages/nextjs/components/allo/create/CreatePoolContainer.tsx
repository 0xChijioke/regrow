import { useState } from "react";
import CreatePoolSteps from "./CreatePoolSteps";
import SelectStrategy from "./strategy/SelectStrategy";

const CreatePoolContainer = ({ profileId }: { profileId: string }) => {
  const [strategyName, setStrategyName] = useState<string>("");
  const [strategyAddress, setStrategyAddress] = useState<string>("");
  const [strategyDeployStatus, setStrategyDeployStatus] = useState<string>("");
  const [strategyConfig, setStrategyConfig] = useState<any>({});
  const [currentStep, setCurrentStep] = useState<string>("1");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStrategySelect = (name: string, address: string, config: any) => {
    setStrategyName(name);
    setStrategyAddress(address);
    setStrategyConfig(config);
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
            strategyConfig={strategyConfig}
            onStrategySelect={handleStrategySelect}
            onNextStep={handleNextStep}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePoolContainer;
