import { useEffect } from "react";
import { Spinner } from "../assets/Spinner";
import ProfileCard from "./ProfileCard";
import { useProfiles } from "~~/contexts/profilesContext";
import { Profile } from "~~/types/types";

const ProfilesList = () => {
  const PAGE_SIZE = 9;

  const { profiles, loading, fetchProfiles } = useProfiles();


  const handleLoadMore = () => {
    // Fetch more profiles when "Load More" is clicked
    fetchProfiles(PAGE_SIZE, profiles.length);
  };


  return (
    <div>
      {profiles.length === 0 && loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      <div className="p-5 lg:grid lg:grid-cols-3">
        {profiles && profiles.map((profile: Profile) => <ProfileCard key={profile.id} profile={profile} />)}
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
