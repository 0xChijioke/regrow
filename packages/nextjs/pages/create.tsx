import { NextPage } from "next"
import { MetaHeader } from "~~/components/MetaHeader"
import CreateProfile from "~~/components/registry/CreateProfile"


const create: NextPage = () => {
  return (
    <>
        <MetaHeader
            title="Create Profile | ReGrow"
            description="Create a new profile on Allo protocol"
        />
    
        <div>
            <CreateProfile />
        </div>
    </>
  )
}

export default create