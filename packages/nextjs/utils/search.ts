// utils/search.ts
import { searchProfiles } from '~~/utils/request';

export const searchProfilesQuery = async (search: string, address: string, pageSize: number, skip: number) => {
  try {
    const data: any = await searchProfiles(pageSize, skip, search, address);
    return data.profiles;
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
};
