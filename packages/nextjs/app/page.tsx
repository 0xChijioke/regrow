"use client";

import Hero from "./_components/homepage/Hero";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center justify-center flex-col flex-grow pt-10">
        <Hero />
      </div>
    </>
  );
};

export default Home;
