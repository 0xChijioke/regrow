import { CreatePoolArgs } from "@allo-team/allo-v2-sdk/dist/types"
import { Address } from "~~/components/scaffold-eth";



const CreatePool = ({ poolData, name, onCreatePool }: { poolData: CreatePoolArgs, name: string, onCreatePool: () => void }) => {
    

       

    


    
     
  return (
    <div className="space-y-5">
      <h2 className="text-center lg:pt-3 text-2xl uppercase">Create Pool</h2>

      {/* Display pool data */}
      <div>
        <p>Pool Name: {poolData.name}</p>
        <div>Strategy: <Address address={poolData.strategy} /></div>
        {/* Add other fields as needed */}
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