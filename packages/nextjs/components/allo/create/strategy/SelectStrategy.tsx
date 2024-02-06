import { useState } from "react";
import { deployStrategy } from "./deployStrategy";
import { InitializeParams } from "@allo-team/allo-v2-sdk/dist/types";
import { useConfig } from "wagmi";
import { AddressInput, BytesInput } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface SelectStrategyProps {
  strategyName: string;
  strategyAddress: string;
  strategyInitData: any;
  onStrategySelect: (name: string, address: string) => void;
  onNextStep: () => void;
}

const SelectStrategy: React.FC<SelectStrategyProps> = ({
  strategyName,
  strategyAddress,
  strategyInitData,
  onStrategySelect,
  onNextStep,
}) => {
  const { chains } = useConfig();
  const { id: chainIdConfig, rpcUrls } = chains?.[0] || {};
  const rpcConfig = rpcUrls?.default?.http?.[0];
  // console.log(chainIdConfig, rpcConfig)
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [strategyType, setStrategyType] = useState<"custom" | "cloneable" | "existing">("custom");

  const handleStrategySelection = () => {
    // Implement logic to handle strategy selection
  };

  const handleMicroGrantsDeploy = async () => {
    notification.info("Deployment started.");
  
    try {
      const address = await deployStrategy("MicroGrantsv1", rpcConfig, chainIdConfig);
      console.log(address);
      notification.success("Deployment successful!", { duration: 5 });
      
      setDeploymentStatus("success");
      setDeployedAddress(address);
      
      onStrategySelect("MicroGrants", address);
      onNextStep();
    } catch (err) {
      console.error("Error deploying strategy", err);
      notification.error("Deployment failed. Please try again.", { duration: 5 });
      setDeploymentStatus("error");
    }
  };
  

  return (
    <div className="space-y-5 w-fit">
      <h2 className="text-center lg:pt-3 text-2xl uppercase">Select Strategy</h2>

      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${strategyType === "custom" ? "tab-active" : ""}`}
          onClick={() => setStrategyType("custom")}
        >
          Custom
        </a>
        <a
          role="tab"
          className={`tab ${strategyType === "cloneable" ? "tab-active" : ""}`}
          onClick={() => setStrategyType("cloneable")}
        >
          Cloneable
        </a>
        <a
          role="tab"
          className={`tab ${strategyType === "existing" ? "tab-active" : ""}`}
          onClick={() => setStrategyType("existing")}
        >
          Existing
        </a>
      </div>
      {/* Tab end */}

      {strategyType === "custom" && (
        <div className="flex justify-center">
          {deploymentStatus === "success" && (
            <div>
              <p>Strategy deployed successfully at address {deployedAddress}</p>
            </div>
          )}

          {deploymentStatus !== "success" && (
            <button className="btn rounded-lg btn-secondary" onClick={handleMicroGrantsDeploy}>
              Use MicroGrants Strategy
            </button>
          )}
        </div>
      )}

      {strategyType === "existing" && (
        <>
          <div>
            <label>
              Strategy Address:
              <AddressInput value={strategyAddress} onChange={e => {}} />
            </label>
          </div>
          <div>
            <label>
              Strategy Initialization Data:
              <BytesInput placeholder="Enter bytes" onChange={e => {}} value={strategyInitData} />
            </label>
          </div>
        </>
      )}
      {/* Existing end */}

      {/* sections for "cloneable" */}

      {/* <button onClick={handleStrategySelection}>Next</button> */}
    </div>
  );
};

export default SelectStrategy;
