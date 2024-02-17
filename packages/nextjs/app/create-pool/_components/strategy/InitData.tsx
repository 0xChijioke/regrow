import { InitializeParams } from "@allo-team/allo-v2-sdk/dist/types";
import React, { useState } from "react";
import { Address, AddressInput, BytesInput, EtherInput, InputBase } from "~~/components/scaffold-eth";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import { useConfig } from "wagmi";
import { MicroGrantsStrategy } from "@allo-team/allo-v2-sdk";
import { debounce } from "lodash";
import { formatEther, parseEther } from "viem";

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
interface InitDataProps {
  strategyAddress: string;
  strategyName: string;
  onInitDataSubmit: (initData: any) => void;
  handlePoolDataInput: (name: string, token: string, amount: bigint, managers: string[]) => void;
  onNextStep: () => void;
}

const InitData: React.FC<InitDataProps> = ({ strategyAddress, strategyName, onInitDataSubmit, handlePoolDataInput, onNextStep }) => {
    const { chains } = useConfig();
    const { id: chainIdConfig, rpcUrls } = chains?.[0] || {};
    const rpcConfig = rpcUrls?.default?.http?.[0];
  // console.log(chainIdConfig, rpcConfig)
  

    const [isInitDataFetched, setIsInitDataFetched] = useState(false);
    const [name, setName] = useState('');
    const [token, setToken] = useState(NATIVE);
    const [amount, setAmount] = useState<bigint>(BigInt(0));
    const [managers, setManagers] = useState<string[]>([]);
    const [initData, setInitData] = useState<InitializeParams>({
        useRegistryAnchor: true,
        allocationStartTime: BigInt(0),
        allocationEndTime: BigInt(0),
        approvalThreshold: BigInt(0),
        maxRequestedAmount: BigInt(0),
    });

      
    const strategy = new MicroGrantsStrategy({
      chain: Number(chainIdConfig),
      rpc: rpcConfig,
    });
    
  
    

    const handleInitDataSubmit = async () => {
      // Validate initData
      // console.log(initData)

      // Fetch initialization data
      const fetchedInitData = await strategy.getInitializeData(initData);
        // console.log("Fetched Initialization Data:", fetchedInitData);
      
        onInitDataSubmit(fetchedInitData);
        setIsInitDataFetched(true);
      };
    
    const handleAllocationStartTimeChange = (date: Moment | string) => {
      // console.log(date)
      let allocationStartTimeInSeconds: number;

      if (typeof date === 'string') {
        allocationStartTimeInSeconds = Date.parse(date) / 1000; // Convert milliseconds to seconds
      } else {
        allocationStartTimeInSeconds = moment(date).unix(); // Convert moment object to seconds
      }
      setInitData({ ...initData, allocationStartTime: BigInt(allocationStartTimeInSeconds) });
      // console.log(allocationStartTimeInSeconds)
      // console.log("Start", new Date(allocationStartTimeInSeconds * 1000)); // Multiply by 1000 to convert to milliseconds
    };

    const handleAllocationEndTimeChange = (date: Moment | string) => {
      // console.log(date)
      let allocationEndTimeInSeconds: number;

      if (typeof date === 'string') {
        allocationEndTimeInSeconds = Date.parse(date) / 1000; // Convert milliseconds to seconds
      } else {
        allocationEndTimeInSeconds = moment(date).unix(); // Convert moment object to seconds
      }
      setInitData({ ...initData, allocationEndTime: BigInt(allocationEndTimeInSeconds) });
      // console.log(allocationEndTimeInSeconds)
      // console.log("End", new Date(allocationEndTimeInSeconds * 1000)); // Multiply by 1000 to convert to milliseconds
  };
  
   
  // Debounce the amount input field
  const debouncedSetAmount = debounce((value: string) => {
    setAmount(parseEther(value));
  }, 500);

  // Debounce the max requested amount input field
const debouncedSetMaxRequestedAmount = debounce((value: string) => {
  const parsedValue = parseFloat(value);
  // Check if the parsed value is a valid number
  if (!isNaN(parsedValue)) {
    const stringVal = parsedValue.toString();
    const maxRequestedAmountBigInt = parseEther(stringVal);
    setInitData({ ...initData, maxRequestedAmount: maxRequestedAmountBigInt });
  }
}, 1000);


  const handleAddManager = () => {
    setManagers([...managers, '']);
  };

  const handleManagerChange = (index: number, value: string) => {
    const updatedManagers = [...managers];
    updatedManagers[index] = value;
    setManagers(updatedManagers);
  };

    
  // console.log(initData)

  return (
    <div className="space-y-5 flex flex-col justify-center max-w-screen-sm lg:max-w-screen-lg">
      <h2 className="text-center lg:pt-3 text-2xl uppercase">{isInitDataFetched ? "Pool variables" : "Set Initialization Data"}</h2>

      {/*  */}
      <div className="text-center justify-center items-center flex flex-col">
        <div className="flex font-light text-sm lg:text-lg lg:whitespace-nowrap">{strategyName} strategy deployed successfully at address
        </div>
          <div className="pl-2 justify-center flex w-full">
            <Address address={strategyAddress} />
          </div>
      </div>

      {/* Render initialization data section if it hasn't been fetched */}
      {!isInitDataFetched && (
        <>
          <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-evenly">
            <div>
              <label>
                  Allocation Start Time:
                <Datetime
                  className="bg-inherit items-center w-fit"
                  value={initData.allocationStartTime ? moment.unix(Number(initData.allocationStartTime)) : ''}
                  onChange={(date) =>handleAllocationStartTimeChange(date)}
                  />
                </label>
            </div>
            <div>
              <label>
                  Allocation End Time:
                <Datetime
                  className="bg-inherit"
                  value={initData.allocationEndTime ? moment.unix(Number(initData.allocationEndTime)) : ''}
                  onChange={(date) =>handleAllocationEndTimeChange(date)}
                  />
              </label>
            </div>
          </div>
          <div>
            <label>
              Approval Threshold:
              <InputBase
                value={initData.approvalThreshold.toString()}
                onChange={(e) => setInitData({ ...initData, approvalThreshold: BigInt(e) })}
              />
            </label>
          </div>
          <div>
            <label>
              Max Requested Amount:
              <EtherInput
                value={formatEther(initData.maxRequestedAmount)}
                onChange={(e) => debouncedSetMaxRequestedAmount(e)}
              />
            </label>
          </div>

          <button
            className="btn btn-secondary rounded-lg"
            disabled={!initData.allocationEndTime || !initData.allocationStartTime || !initData.approvalThreshold || !initData.maxRequestedAmount}
            onClick={handleInitDataSubmit}>Submit Initialization Data
          </button>
        </>
      )}

      {/* Render the rest of the form after init data has been fetched */}
      {isInitDataFetched && (
        <div className="flex flex-col space-y-3 item justify-center mx-auto w-fit">

          {/* input fields for pool creation */}
          <label className="flex flex-col mt-4">
            Pool name:
            <InputBase
              value={name}
              onChange={(e) => setName(e)}
            />
          </label>

           <label className="flex flex-col mt-4">
            Token:
            <AddressInput
              value={token}
              onChange={(e) => setToken(e)}
              placeholder='Token address'
            />
          </label>
          <label className="flex flex-col mt-4">
            Amount:
            <EtherInput
              value={formatEther(amount)}
              onChange={(e) => debouncedSetAmount(e)}
            />
          </label>
          
          <label className="flex flex-col mt-4">
            Managers:
            {managers.map((manager, index) => (
              <div className="my-2" key={index}>
                <AddressInput
                  value={manager}
                  onChange={(value) => handleManagerChange(index, value)}
                />
              </div>
            ))}
            <button className="flex justify-end" type="button" onClick={handleAddManager}>
              Add Manager
            </button>
          </label>

          {/* Button to submit */}
          <div className="flex w-full justify-center">
            <button
              className="btn rounded-lg"
              onClick={() => handlePoolDataInput(name, token, amount, managers)}
              type="submit" disabled={!name || !token || !amount}>
              {'Verify and create pool'}
            </button>
          </div>                       
        </div>
        )}
    </div>
  );
};

export default InitData;
