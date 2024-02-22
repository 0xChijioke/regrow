"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreatePoolContainer from "../_components/CreatePoolContainer";
import { NextPage } from "next";

const Page: NextPage = () => {
  const params = useParams();
  const { profileId } = params;
  const [creatorProfileId, setCreatorProfileId] = useState<string>("");

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
    <div>
      <CreatePoolContainer profileId={creatorProfileId} />
    </div>
  );
};

export default Page;
