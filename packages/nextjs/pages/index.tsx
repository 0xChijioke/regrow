import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Hero from "~~/components/homepage/Hero";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";


const Home: NextPage = () => {

  const { data: deployedContractData } = useDeployedContractInfo("Registry");
  // console.log(deployedContractData)
  
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
