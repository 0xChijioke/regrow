

export type Tmetadata = {
    protocol: bigint;
    pointer: string;
}




export type Profile = {
    id: string;
    createdAt: string;
    updatedAt: string;
    anchor: string;
    name: string;
    metadata: {
      pointer: string;
      protocol: number;
      id: string;
    };
    nonce: string;
    owner: {
      id: string;
    };
  };
  
  export type ProfileDetail = {
    [x: string]: SetStateAction<ProfileDetail | null>;
    id: string;
    name: string;
    nonce: string;
    updatedAt: string;
    owner: {
      id: string;
    };
    metadata: {
      id: string;
      pointer: string;
      protocol: number;
    };
    memberRole: {
      id: string;
      accounts: {
        id: string;
      }[];
    };
    anchor: string;
    createdAt: string;
  };
  