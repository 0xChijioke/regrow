// pages/api/profiles.js
import { fetchProfilesWithPagination } from '~~/utils/request'; // Import your GraphQL fetch function

export default async function handler(req, res) {
  const { page = 1, limit = 10, sortBy, filterBy } = req.query;

  try {
    // Fetch profiles using GraphQL with pagination, sorting, and filtering
    const profiles = await fetchProfilesWithPagination(page, limit, sortBy, filterBy);

    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
}
