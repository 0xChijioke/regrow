// context/ProfilesContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { Profile } from '~~/types/types';
import { fetchProfilesQuery } from '~~/utils/request';

interface ProfilesContextType {
  profiles: Profile[];
  loading: boolean;
  fetchProfiles: (offset: number, limit: number) => Promise<void>;
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined);

export const ProfilesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);


  const memoizedProfiles = useMemo(() => {
    const uniqueProfileIds = new Set();

    // Filter out duplicates and update the profiles state
    return profiles.filter((profile) => {
      if (!uniqueProfileIds.has(profile.id)) {
        uniqueProfileIds.add(profile.id);
        return true; // Include the profile if it's unique
      }
      return false; // Exclude the profile if it's a duplicate
    });
  }, [profiles]);

  
  const fetchProfiles = async (pageSize: number, skip: number) => {
    setLoading(true);
    try {
      const data: any = await fetchProfilesQuery(pageSize, skip);
      // Combine existing profiles with new ones and filter duplicates
      setProfiles((prevProfiles) => [
        ...prevProfiles,
        ...data.profiles,
      ]);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  

  
  useEffect(() => {
      fetchProfiles(9, 0);
  }, []);
  
  
  console.log(memoizedProfiles);

  return (
    <ProfilesContext.Provider value={{ profiles: memoizedProfiles, loading, fetchProfiles }}>
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfilesProvider');
  }
  return context;
};
