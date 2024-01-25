// context/ProfilesContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Profile } from '~~/types/types';
import { fetchProfilesQuery } from '~~/utils/request';

interface ProfilesContextType {
  profiles: Profile[];
  fetchProfiles: (offset: number, limit: number) => Promise<void>;
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined);

export const ProfilesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async (pageSize: number, skip: number) => {
    try {
      setLoading(true);
      const data: any = await fetchProfilesQuery(pageSize, skip);
      setProfiles((prevProfiles) => [...prevProfiles, ...data.profiles]);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ProfilesContext.Provider value={{ profiles, fetchProfiles }}>
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
