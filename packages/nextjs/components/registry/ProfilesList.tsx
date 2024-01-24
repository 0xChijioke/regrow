import { useQuery } from 'react-query';
import { useEffect, useState } from "react";
import { fetchProfiles } from "~~/utils/request";
import ProfileCard from './ProfileCard';
import { Profile } from '~~/types/types';



const ProfilesList = () => {   
  const PAGE_SIZE = 9; // Define page size
  const [skip, setSkip] = useState(0);


  const { data, isLoading, isError, refetch } = useQuery(
    ['profiles', skip],
    async () =>
      fetchProfiles(PAGE_SIZE, skip), {
      refetchOnMount: false,
  });
  // Manually refetch data
  const handleRefetch = () => {
      refetch();
  };

  

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>Error fetching profiles...</div>;
  }

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + PAGE_SIZE);
  };


  
  
  
  
    return (
      <div className='p-5 lg:grid lg:grid-cols-3'>
        {data.profiles.map((profile: Profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        <div>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    );
}
export default ProfilesList;









      // const client = new GraphQLClient(graphqlEndpoint);
  
    // const { data } = useScaffoldContractRead({
    //   contractName: "Registry",
    //   functionName: "getProfileById",
    //   args: ["0x"],
    // });
  
    // const { data: Registry } = useScaffoldContract({
    //   contractName: "Registry",
    // });
  
    // console.log(Registry)