"use client";

import React from "react";
import ProfilesList from "./_components/ProfilesList";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="max-w-full overflow-hidden">
      <ProfilesList />
    </div>
  );
};

export default Page;
