"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AcceptOwnership from "../_components/AcceptOwnership";
import ManageMembers from "../_components/ManageMembers";
import Placeholder from "../_components/Placeholder";
import TransferOwnership from "../_components/TransferOwnership";
import UpdateMetadata from "../_components/UpdateMetadata";
import UpdateName from "../_components/UpdateName";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { formatTime } from "~~/helpers/formateTime";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ProfileDetail } from "~~/types/types";
import { fetchProfileById } from "~~/utils/request";

const Page: NextPage = () => {
  const { address } = useAccount();
  const params = useParams();
  const { profileId } = params;
  const [profile, setProfile] = useState<ProfileDetail | null>(null);

  // Check for pending owner
  const { data: pendingOwner } = useScaffoldContractRead({
    contractName: "Registry",
    functionName: "profileIdToPendingOwner",
    args: [profileId as `0x${string}`],
  });
  // Check if address is an owner or member of profile
  const { data: isOwnerOrMember } = useScaffoldContractRead({
    contractName: "Registry",
    functionName: "isOwnerOrMemberOfProfile",
    args: [profileId as `0x${string}`, address],
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ["profile", profileId],
    () => (profileId ? fetchProfileById(profileId as string) : null),
    {
      enabled: !!profileId,
    },
  );

  useEffect(() => {
    if (data) {
      setProfile(data.profile);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <progress className="progress w-72"></progress>
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  const profileCreated = profile?.createdAt ? formatTime(Number(profile.createdAt)) : "";
  const profileUpdated = profile?.updatedAt ? formatTime(Number(profile.updatedAt)) : "";

  return (
    <div>
      {/* Display profile details */}
      {profile && (
        <div className="w-full flex-col lg:flex-col flex p-3">
          <div className="flex-row w-full rounded-xl p-3 justify-center items-center">
            <h2 className="text-center text-3xl font-bold">{profile.name}</h2>

            {/* Image & Description */}
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:flex-col flex-col-reverse lg:w-[40%] flex justify-center">
                <div className="flex justify-between">
                  <div className="flex items-center py-3 flex-nowrap">
                    <span className="px-2">Anchor: </span>
                    <Address address={profile.anchor} />
                  </div>
                  {/* Dropdown */}
                  <div className="">
                    {profile?.owner.id.toLowerCase() === address?.toLowerCase() && (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn rounded-md py-1 m-1">
                          Manage
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 items-center rounded-box w-52"
                        >
                          <li>
                            <UpdateName profile={profile} refetch={refetch} />
                          </li>
                          <li>
                            <UpdateMetadata profile={profile} />
                          </li>
                          <li>
                            <ManageMembers profile={profile} refetch={refetch} />
                          </li>
                          <li>
                            <TransferOwnership profileId={profile.id} refetch={refetch} />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="rounded-xl">
                  <Placeholder />
                </div>
              </div>
              <div className="w-fit flex-col lg:p-10">
                <p className="text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis sapien in risus facilisis
                  blandit. Nulla facilisi. Sed vestibulum laoreet lacus, eget venenatis ex fermentum vel. Curabitur
                  ultricies, ligula id consequat luctus, elit urna bibendum arcu, et sodales tortor leo sit amet nulla.
                  Integer scelerisque imperdiet est, id fringilla justo congue eget. Maecenas eu facilisis purus.
                  Vivamus tincidunt eros a erat tincidunt, sit amet semper libero auctor.
                </p>
                <div className="w-full items-start">
                  <div className="text-left flex-col text-sm">
                    <div>
                      <span>Created : </span>
                      {profileCreated}
                    </div>
                    {profile.updatedAt !== profile.createdAt && (
                      <div>
                        <span>Updated : </span>
                        {profileUpdated}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end flex-nowrap">
                    <span className="px-2 font-semibold">Owned by </span>
                    <Address address={profile.owner.id} />
                  </div>
                  <br />
                  {pendingOwner !== zeroAddress && (
                    <div className="flex justify-end flex-nowrap">
                      <span className="px-2 font-semibold">Pending owner </span>
                      <Address address={pendingOwner} />
                    </div>
                  )}
                  {/* Accept and create pool */}
                  <div>
                    {address === pendingOwner && <AcceptOwnership profileId={profile.id} refetch={refetch} />}
                    {isOwnerOrMember && (
                      <Link href={`/create-pool/${profile.id}`} key={profile.id}>
                        <button className="btn p-2 rounded-xl tracking-wide text-sm btn-primary">create pool</button>
                      </Link>
                    )}
                  </div>
                  <div className="w-full justify-end flex">
                    {profile.memberRole.accounts.length > 0 && (
                      <div className="w-fit my-2 flex-start">
                        <h4 className="text-center font-semibold">Members</h4>
                        {profile.memberRole.accounts.map((account, index) => (
                          <span key={index}>
                            <div className="py-2">
                              <Address address={account.id.split("-")[1]} />
                            </div>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center mt-2 items-center text-center bg-base-300 rounded-xl p-3">
            Recent events
          </div>
          {/* Display other profile details */}
        </div>
      )}
    </div>
  );
};

export default Page;
