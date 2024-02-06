import { useState } from "react";
import { deployStrategy } from "./deployStrategy";
import { useConfig } from "wagmi";
import { AddressInput, BytesInput } from "~~/components/scaffold-eth";

interface SelectStrategyProps {
  strategyName: string;
  strategyAddress: string;
  strategyConfig: any;
  onStrategySelect: (name: string, address: string, config: any) => void;
  onNextStep: () => void;
}

const SelectStrategy: React.FC<SelectStrategyProps> = ({
  strategyName,
  strategyAddress,
  strategyConfig,
  onStrategySelect,
  onNextStep,
}) => {
  const { chains } = useConfig();
  const chainIdConfig = chains && chains[0].id;
  const rpcConfig = chains && chains[0].rpcUrls.default.http[0];
  const [newStrategy, setNewStrategy] = useState<boolean>(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [deployedAddress, setDepployedAddress] = useState<string>('');
  const [strategyType, setStrategyType] = useState<"custom" | "cloneable" | "existing">("custom");

  const handleStrategySelection = () => {
    // Implement logic to handle strategy selection

  };

  const handleMicroGrantsDeploy = async () => {
    // Implement logic to handle strategy selection
    try {
      const address = await deployStrategy("MicroGrantsv1", rpcConfig, chainIdConfig);
      setDeploymentStatus("success");
      setDepployedAddress(address);
  

    } catch (err) {

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
        <>
          <button onClick={handleMicroGrantsDeploy}>Use MicroGrants Strategy</button>
        </>
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
              <BytesInput placeholder="Enter bytes" onChange={e => {}} value={strategyConfig} />
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
