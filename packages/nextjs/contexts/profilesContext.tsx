// context/ProfilesContext.tsx
import { orderBy } from 'lodash';
import { createContext, useContext, ReactNode, useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { Profile } from '~~/types/types';
import { fetchProfilesQuery } from '~~/utils/request';

// Enum for valid order fields
export enum OrderByField {
  ID = 'id',
  Name = 'name',
  Owner = 'owner',
  Nonce = 'nonce',
  Anchor = 'anchor',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

// Type for order direction
type OrderDirection = 'asc' | 'desc';


interface ProfilesContextType {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  loading: boolean;
  fetchProfiles: (offset: number, limit: number, orderBy?: OrderByField, orderDirection?: OrderDirection) => Promise<void>;
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

  
  const fetchProfiles = async (pageSize: number, skip: number, orderBy?: string, orderDirection?: string) => {
    
    console.log('Fetching profiles...');
    
    setLoading(true);
    try {
      const data: any = await fetchProfilesQuery(pageSize, skip, orderBy, orderDirection);
      // Combine existing profiles with new ones and filter duplicates
      console.log('...');
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
    if (!profiles.length) fetchProfiles(9, 0, OrderByField.CreatedAt, "desc");
  }, []);
  

  return (
    <ProfilesContext.Provider value={{ profiles: memoizedProfiles, setProfiles, loading, fetchProfiles }}>
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
