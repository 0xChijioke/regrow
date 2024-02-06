import { InitializeParams } from "@allo-team/allo-v2-sdk/dist/types";
import React, { useState } from "react";
import { Address, BytesInput } from "~~/components/scaffold-eth";

interface InitDataProps {
    strategyAddress: string;
    onInitDataSubmit: (initData: any) => void;
    onNextStep: () => void;
}

const InitData: React.FC<InitDataProps> = ({strategyAddress, onInitDataSubmit, onNextStep }) => {
    const [initData, setInitData] = useState<InitializeParams>({
        useRegistryAnchor: true,
        allocationStartTime: BigInt(0),
        allocationEndTime: BigInt(0),
        approvalThreshold: BigInt(0),
        maxRequestedAmount: BigInt(0),
      });
    

    const handleInitDataSubmit = () => {
      // Validate initData
    
      
    
      
        onInitDataSubmit(initData);
        onNextStep();
    };
    
    console.log(strategyAddress)

  return (
    <div className="space-y-5 w-fit">
      <h2 className="text-center lg:pt-3 text-2xl uppercase">Set Initialization Data</h2>

      {/*  */}
      <div>
        <p>Strategy deployed successfully at address <Address address={strategyAddress} /></p>
      </div>

      {/* initialization data */}
      <div>
        <label>
          Allocation Start Time:
          <input
            type="text"
            value={initData.allocationStartTime.toString()}
            onChange={(e) => setInitData({ ...initData, allocationStartTime: BigInt(e.target.value) })}
          />
        </label>
      </div>
      <div>
        <label>
          Allocation End Time:
          <input
            type="text"
            value={initData.allocationEndTime.toString()}
            onChange={(e) => setInitData({ ...initData, allocationEndTime: BigInt(e.target.value) })}
          />
        </label>
      </div>
      <div>
        <label>
          Approval Threshold:
          <input
            type="text"
            value={initData.approvalThreshold.toString()}
            onChange={(e) => setInitData({ ...initData, approvalThreshold: BigInt(e.target.value) })}
          />
        </label>
      </div>
      <div>
        <label>
          Max Requested Amount:
          <input
            type="text"
            value={initData.maxRequestedAmount.toString()}
            onChange={(e) => setInitData({ ...initData, maxRequestedAmount: BigInt(e.target.value) })}
          />
        </label>
      </div>

      <button onClick={handleInitDataSubmit}>Submit Initialization Data</button>
    </div>
  );
};

export default InitData;
