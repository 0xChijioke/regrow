import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { shuffle } from "lodash";
import { OrderByField, useProfiles } from "~~/contexts/profilesContext";
import { Profile } from "~~/types/types";

// TODO: Work on search and displaying pools.
const ProfilesList = () => {
  const PAGE_SIZE = 9;
  const [orderBy, setOrderBy] = useState<OrderByField>(OrderByField.CreatedAt);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const { profiles, setProfiles, loading, fetchProfiles } = useProfiles();

  const handleLoadMore = () => {
    // Fetch more profiles when "Load More" is clicked
    fetchProfiles(PAGE_SIZE, profiles.length, orderBy, orderDirection);
  };

  const handleOrderByChange = (selectedOrderBy: string) => {
    // Set the new orderBy field and trigger a fetch
    setOrderBy(selectedOrderBy as OrderByField);
  };

  const handleOrderDirectionToggle = async () => {
    // Toggle order direction
    const newOrderDirection = orderDirection === "asc" ? "desc" : "asc";
    setOrderDirection(newOrderDirection);

    // Fetch profiles with the new sorting criteria
    await fetchProfiles(PAGE_SIZE, 0, orderBy, newOrderDirection);
  };

  const handleShuffle = () => {
    // Shuffle the profiles array and update the state
    setProfiles(prevProfiles => shuffle(prevProfiles));
  };

  return (
    <div>
      {profiles.length > 0 && (
        <div className="flex-row pt-6 pr-4 flex justify-end items-center gap-x-4">
          {/* <Search /> */}
          <div>
            <select
              className="select select-sm select-bordered w-full max-w-xs"
              onChange={e => handleOrderByChange(e.target.value)}
            >
              <option value="createdAt">Created At</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="owner">Owner</option>
              <option value="nonce">Nonce</option>
              <option value="anchor">Anchor</option>
              <option value="createdAt">Created At</option>
              <option value="updatedAt">Updated At</option>
            </select>
          </div>

          <div>
            <button onClick={handleOrderDirectionToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </button>
          </div>

          <div>
            <button onClick={handleShuffle}>Shuffle</button>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-fit px-8 lg:px-0 lg:grid lg:grid-cols-3">
          {profiles.length === 0 && loading
            ? // Render skeleton cards when loading
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div className="animate-pulse card w-90% lg:w-80 m-3 h-80 glass" key={index}></div>
              ))
            : profiles.map((profile: Profile) => <ProfileCard key={profile.id} profile={profile} />)}
        </div>
      </div>

      {profiles.length > 0 && (
        <div className="items-center justify-center flex">
          <button onClick={handleLoadMore}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" w-14 h-14"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilesList;
