import { InitializeParams } from "@allo-team/allo-v2-sdk/dist/types";
import React, { useState } from "react";
import { Address, BytesInput } from "~~/components/scaffold-eth";
import Datetime from "react-datetime";

interface InitDataProps {
    strategyAddress: string;
    strategyName: string;
    onInitDataSubmit: (initData: any) => void;
    onNextStep: () => void;
}

const InitData: React.FC<InitDataProps> = ({strategyAddress, strategyName, onInitDataSubmit, onNextStep }) => {
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
    

  return (
    <div className="space-y-5 w-fit">
      <h2 className="text-center lg:pt-3 text-2xl uppercase">Set Initialization Data</h2>

      {/*  */}
      <div className="text-center">
        <div className="flex font-light whitespace-nowrap">{strategyName} strategy deployed successfully at address
          <div className="pl-2 flex">
            <Address address={strategyAddress} />
          </div>
        </div>
      </div>

      {/* initialization data */}
      <div>
        <label>
            Allocation Start Time:
            <Datetime
              value={new Date(Number(initData.allocationStartTime))}
              onChange={(date) =>
                setInitData({ ...initData, allocationStartTime: BigInt(date.getTime()) })
              }
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
