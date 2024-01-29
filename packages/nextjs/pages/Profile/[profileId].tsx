import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 
import { Profile, ProfileDetail } from '~~/types/types';
import { useProfiles } from '~~/contexts/profilesContext';
import { fetchProfileById } from '~~/utils/request';
import { Address } from '~~/components/scaffold-eth';
import moment from 'moment';
import { MetaHeader } from '~~/components/MetaHeader';
import { useQuery } from 'react-query';
import UpdateProfileData from '~~/components/registry/UpdateProfileData';
import { useAccount } from 'wagmi';

const ProfileDetail = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { profileId } = router.query;
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const { data, isLoading, isError } = useQuery(
    ['profile', profileId],
    () => profileId ? fetchProfileById(profileId as string) : null, 
    {
      enabled: !!profileId,
    }
  );

  useEffect(() => {
    if (data) {
      setProfile(data.profile);
    }
  },[data])

  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const profileCreated = profile?.createdAt ? moment(profile.createdAt).format('YYYY-MM-DD') : '';
  const profileUpdated = profile?.updatedAt ? moment(profile.updatedAt).format('YYYY-MM-DD') : '';


  // console.log(profile)
  return (
    <div>
      <MetaHeader
            title=" Profile | ReGrow"
            description="Profile detail"
        />
      {/* Display profile details */}
      {profile && (
         
        <div className='w-full flex-col lg:flex-row  flex p-3'>
          <div className='flex-start bg-primary rounded-xl p-3 justify-center items-center'>
            <h2 className='text-center text-2xl font-semibold'>{profile.name}</h2>
            
            {/* Image */}
            <div className='w-96 flex justify-center'>
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
              </figure>
            </div>

            {/* Details */}
            <div className="flex py-2 w-full">
              <div className='flex-end flex-col'>
                <div className='flex flex-nowrap'><span className='px-2'>Owner: </span><Address address={profile.owner.id} /></div><br />
                <div className='flex flex-nowrap'><span className='px-2'>Ancour: </span><Address address={profile.anchor} /></div>
              </div>
              <div className='text-left items-center flex flex-col text-sm'>
                <div>
                  <span>Created : </span>
                  {profileCreated}
                </div>
                <div>
                  <span>Updated : </span>
                  {profileUpdated}
                </div>
              </div>
            </div>
            <div>
              {(profile?.owner.id.toLowerCase() === address?.toLowerCase()) && <UpdateProfileData profile={profile} />}
            </div>
          </div>

          <div className='lg:flex-end w-full lg:w-[40] justify-center mt-2 lg:mt-0 items-center text-center bg-base-300 rounded-xl lg:mx-2 p-3'>
            Analyisis & Evalation comming soon...
          </div>
          {/* Display other profile details */}
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
