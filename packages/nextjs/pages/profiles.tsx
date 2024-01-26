import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

import ProfilesList from "~~/components/registry/ProfilesList";


const Profiles: NextPage = () => {
  
  return (
    <>
      <MetaHeader
        title="Profiles | ReGrow"
        description="Explore profiles on Allo"
      />
      <div className="flex items-center justify-center flex-col flex-grow pt-10">
       <ProfilesList />
      </div>
    </>
  );
};

export default Profiles;
