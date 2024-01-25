import { useQuery } from 'react-query';
import { useEffect, useState } from "react";
import ProfileCard from './ProfileCard';
import { Profile } from '~~/types/types';
import { useProfiles } from '~~/contexts/profilesContext';



const ProfilesList = () => { 

  const PAGE_SIZE = 9;

  const { profiles, fetchProfiles } = useProfiles();

  useEffect(() => {
    // Fetch profiles only if the profiles array is empty
    if (profiles.length === 0) {
      fetchProfiles(PAGE_SIZE, 0);
    }
  }, [fetchProfiles, profiles]); 



  const handleLoadMore = () => {
    // Fetch more profiles when "Load More" is clicked
    fetchProfiles(PAGE_SIZE, profiles.length);
  };
  


  
    return (
      <div className='p-5 lg:grid lg:grid-cols-3'>
        {profiles && profiles.map((profile: Profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        <div>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    );
}
export default ProfilesList;
