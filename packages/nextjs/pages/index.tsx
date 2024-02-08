import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Hero from "~~/components/homepage/Hero";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const API = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
const RPC = `https://eth-goerli.g.alchemy.com/v2/${API}`;






const Home: NextPage = () => {

  // const { data: deployedAllo } = useDeployedContractInfo("ALLOPROXY");
  // console.log(deployedAllo)

  // const { data: deployedRegistry } = useDeployedContractInfo("REGISTRY");
  // console.log(deployedRegistry)
  
  return (
    <>
      <MetaHeader />
      <div className="flex items-center justify-center flex-col flex-grow pt-10">
       <Hero />
      </div>
    </>
  );
};

export default Home;
