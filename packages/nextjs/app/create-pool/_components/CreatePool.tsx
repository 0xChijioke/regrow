import { CreatePoolArgs } from "@allo-team/allo-v2-sdk/dist/types"
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";



const CreatePool = ({ poolData, name, onCreatePool }: { poolData: CreatePoolArgs, name: string, onCreatePool: () => void }) => {
    

       

    


    
     
    return (

        <div className="flex flex-col w-fit justify-center">
            
          
            <h2 className="text-center lg:pt-3 text-2xl uppercase">Create Pool</h2>

            {/* Display pool data */}
            <div>
                <p>Pool Name: {name}</p>
                <div className="flex whitespace-nowrap">Strategy: <Address address={poolData.strategy} /></div>
                <div className="flex whitespace-nowrap">Token: <Address address={poolData.token} /></div>
                <div> Amount: {formatEther(poolData.amount)} ETH</div>
                <div className="overflow-y-auto w-80">Strategy Data: {poolData.initStrategyData}</div>
                <div> Profile ID: {poolData.profileId}</div>

                {/* Display managers */}
                <div>
                    Managers:
                    {poolData.managers.length > 0 ? (
                        <div>
                        {poolData.managers.map((manager, index) => (
                            <div key={index}>
                            <Address address={manager} />
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p>No Managers</p>
                    )}
                </div>
            
            </div>

            {/* Button to create pool */}
            <div className="flex justify-center">
                <button className="btn rounded-lg" onClick={onCreatePool}>
                Create Pool
                </button>
            </div>
        </div>
  )
}

export default CreatePool