import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Hero from "~~/components/homepage/Hero";
import { getIPFSClient } from "~~/services/ipfs";


const Home: NextPage = () => {
  
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
