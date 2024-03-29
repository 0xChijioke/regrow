import React from "react";
import Pools from "./_components/pools";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div className="max-w-full overflow-hidden">
      <Pools />
    </div>
  );
};

export default page;
