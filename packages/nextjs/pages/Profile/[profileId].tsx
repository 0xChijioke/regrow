import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProfileById } from '~~/utils/request'; 
import { Profile } from '~~/types/types';
import { useQuery } from 'react-query';

const ProfileDetail = () => {
    const router = useRouter();
    const { profileId } = router.query;
    //   const [profile, setProfile] = useState<Profile | null>(null);
     
    const { data, isLoading, isError } = useQuery(['profile', profileId], () => fetchProfileById(profileId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching profile...</div>;
    }
    
    // console.log(data.profile);
    const profile = data.profile;

  // Render profile details using 'profile' data
  
  return (
    <div>
      {/* Display profile details */}
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          {/* Display other profile details */}
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
