import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CreatePool from "~~/components/allo/CreatePool";
import CreatePoolContainer from "~~/components/allo/create/CreatePoolContainer";


const CreatePoolPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { profileId } = router.query;

  const [creatorProfileId, setCreatorProfileId] = useState<string>('');


  
  useEffect(() => {
    if (profileId) {
      if (Array.isArray(profileId)) {
        setCreatorProfileId(profileId[0]);
      } else {
        setCreatorProfileId(profileId);
      }
    }
  }, [profileId]);


  return (
    <div className="flex flex-col">
      <CreatePoolContainer profileId={creatorProfileId} />
    </div>
  )
}

export default CreatePoolPage;