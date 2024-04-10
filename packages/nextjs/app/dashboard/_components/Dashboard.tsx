"use client";

import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Dashboard = () => {
  const { address } = useAccount();

  return (
    <div>
      <h1 className="text-center">Dashboard</h1>
      <p className="flex whitespace-nowrap justify-center text-center">
        Welcome, <Address address={address} />
      </p>
    </div>
  );
};

export default Dashboard;
