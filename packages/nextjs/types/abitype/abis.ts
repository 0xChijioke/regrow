export type AbiComponent = {
    name: string;
    type: string;
    internalType?: string;
    components?: Array<AbiComponent>;
  };
  
  export type AbiItem = {
    type: string; // 'function', 'event', 'constructor', etc.
    name?: string; // Function or event name
    anonymous?: boolean; // true if the function is anonymous
    inputs?: Array<{
      name: string;
      type: string;
      internalType?: string;
      indexed?: boolean;
      components?: Array<AbiComponent>;
    }>; // Function or event parameters
    outputs?: Array<{
      name: string;
      type: string;
      internalType?: string;
      components?: Array<{
        internalType?: string;
        name?: string;
        type?: string;
        components?: Array<{
          internalType?: string;
          name?: string;
          type?: string;
        }>;
      }>;
    }>; // Function outputs
    stateMutability?: "pure" | "view" | "nonpayable" | "payable"; // Function state mutability
  };
  
  export type ContractAbi = Array<AbiItem>;