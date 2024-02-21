import { useState } from "react";
import { TxnNotification } from "../CreatePoolContainer";
import { deployStrategy } from "./deployStrategy";
import { useAccount, useConfig, usePublicClient } from "wagmi";
import { AddressInput, BytesInput } from "~~/components/scaffold-eth";
import useSDK from "~~/hooks/allo/useSDK";
import { notification } from "~~/utils/scaffold-eth";

interface SelectStrategyProps {
  // strategyName: string;
  strategyAddress: string;
  strategyInitData: any;
  onStrategySelect: (name: string, address: string) => void;
  onNextStep: () => void;
}

const SelectStrategy: React.FC<SelectStrategyProps> = ({
  // strategyName,
  strategyAddress,
  strategyInitData,
  onStrategySelect,
  onNextStep,
}) => {
  const { chains } = useConfig();
  const { id: chainIdConfig } = chains?.[0] || {};
  const { strategyMG } = useSDK();

  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [strategyType, setStrategyType] = useState<"custom" | "cloneable" | "existing">("custom");

  // const handleStrategySelection = () => {
  //   // Implement logic to handle strategy selection
  // };

  const handleMicroGrantsDeploy = async () => {
    let notificationId = null;

    try {
      notificationId = notification.loading(<TxnNotification message="Awaiting strategy deployment." />);

      // Ensure address is truthy
      if (address) {
        const deployment = await deployStrategy("MicroGrantsv1", chainIdConfig, address, publicClient, strategyMG);

        if (deployment && deployment.deployedStrategyAddress) {
          notification.success("Deployment successful!");
          setDeploymentStatus("success");
          setDeployedAddress(deployment.deployedStrategyAddress);
          console.log(deployedAddress); // placeholder for linting purposes

          onStrategySelect("MicroGrants", deployment.deployedStrategyAddress);
          // Add a timeout before moving to the next step
          setTimeout(() => {
            onNextStep();
          }, 20); // 20 milliseconds
        } else {
          notification.error("Deployment failed. Please try again.");
          setDeploymentStatus("error");
        }
      }
    } catch (err) {
      console.error("Error deploying strategy", err);
      notification.error("Deployment failed. Check console and try again.", { duration: 5 });
      setDeploymentStatus("error");
    } finally {
      if (notificationId) {
        notification.remove(notificationId);
      }
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
              <AddressInput
                value={strategyAddress}
                onChange={e => {
                  console.log(e);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Strategy Initialization Data:
              <BytesInput
                placeholder="Enter bytes"
                onChange={e => {
                  console.log(e);
                }}
                value={strategyInitData}
              />
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
