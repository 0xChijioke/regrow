import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 
import { Profile, ProfileDetail } from '~~/types/types';
import { useProfiles } from '~~/contexts/profilesContext';
import { fetchProfileById } from '~~/utils/request';
import { Address } from '~~/components/scaffold-eth';

const ProfileDetail = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (profileId) {
      // Fetch the profile by id
      setLoading(true);
      fetchProfileById(profileId)
        .then((data: any) => {
          // Handle the successful response
          // console.log(data);
          setProfile(data.profile)
        })
        .catch((error) => {
          // Handle errors
          setError('Error fetching profile details');
          console.error('Error fetching profile details:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [profileId]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    

  return (
    <div>
      {/* Display profile details */}
      {profile && (
        <div className='w-full flex p-3'>
          <div className='flex-start justify-center items-center'>
            <h2>{profile.name}</h2>
            
            {/* Image */}
            <div className=' max-w-96'>
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
              </figure>
            </div>

            {/* Details */}
            <div className='flex flex-nowrap'><span className='px-2 py-2'>Owner: </span><Address address={profile.owner.id} /></div>
            <div className='flex flex-nowrap'><span className='px-2 py-2'>Ancour: </span><Address address={profile.anchor} /></div>
            <div>
              <span>Created At: </span>
              {Date(profile.createdAt)}
            </div>
            <div>
              <span>Updated At: </span>
              {Date(profile.updatedAt)}
            </div>
          </div>
          <div></div>
          {/* Display other profile details */}
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
