import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import CreatePool from "~~/components/allo/CreatePool";


const CreatePoolPage = () => {

  const { address } = useAccount();
  const router = useRouter();
  const { profileId } = router.query;
  return (
    <div>
        <CreatePool profileId={profileId} />
    </div>
  )
}

export default CreatePoolPage;