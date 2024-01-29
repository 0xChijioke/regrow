// utils/searchUtils.ts
import { Profile } from '~~/types/types';

// Function to perform search on profiles
export const searchProfiles = (profiles: Profile[], searchTerm: string): Profile[] => {
    // Convert the search term to lowercase for case-insensitive search
    const searchQuery = searchTerm.toLowerCase().trim();

    // Perform search based on profile name, owner, members, and anchor
    return profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery) ||
        profile.owner.id.toLowerCase().includes(searchQuery) ||
        profile.members.accounts.some((account: { id: string; }) => account.id.toLowerCase().includes(searchQuery)) ||
        profile.anchor.toLowerCase().includes(searchQuery)
    );
};
