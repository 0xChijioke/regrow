// request.ts
import { GraphQLClient } from "graphql-request";
import { getProfileById, getProfilesQuery } from './query';
import { getIPFSClient } from "~~/services/ipfs";



const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || ''; 
const client = new GraphQLClient(graphqlEndpoint);
const IPFSClient = getIPFSClient();


export const fetchProfilesQuery = async (first: number, skip?: number) => {
  try {
    const data = await client.request(getProfilesQuery, {
      first,
      skip,
    });

    
    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};




export const fetchProfileById = async (id: string) => {
  const data = await client.request(getProfileById, {
      id,
  });
  return data;
};




// Your function to extract base64 image from HTML
function extractBase64Image(htmlData: string) {
  // Replace this with your logic to extract the base64 image from HTML
  // Example: Use a regular expression to find the base64-encoded image data
  const match = htmlData.match(/<img\s+.*?src\s*=\s*['"](data:image\/[^'"]+)['"].*?>/i);
  
  if (match && match[1]) {
    return match[1];
  } else {
    console.error('Image not found in HTML data:', htmlData);
    return 'default-image-url'; // Set a default image URL if extraction fails
  }
}


