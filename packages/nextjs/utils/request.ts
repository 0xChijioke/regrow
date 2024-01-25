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

    // Resolve metadata from IPFS for each profile
    for (const profile of data.profiles) {
      const { pointer } = profile.metadata;
      

      if (!pointer) {
        // Handle empty pointers
        console.log('Empty pointer for profile:', profile.name);
        // Optionally set default metadata
        profile.metadata = { name: profile.name, description: 'Default description', image: 'default-image-url' };
      
      } else if (pointer.startsWith('bafy')) {
        // Handle IPFS hash pointers
        // const metadata = await IPFSClient.fetchText(pointer);
        // console.log("pointer", metadata)
        // profile.metadata = metadata;
        profile.metadata = { name: profile.name, description: 'Default description', image: 'default-image-url' };
      } else {
        // Handle text pointers or other types accordingly
        // const textMetadata = await IPFSClient.fetchText(pointer); // Your custom function to fetch text-based metadata
        // profile.metadata = textMetadata;
        profile.metadata = { name: profile.name, description: 'Default description', image: 'default-image-url' };
      }





      // if (metadata) {
      //   profile.metadata = metadata; // Update profile metadata with resolved data
      // } else {
      //   // Handle empty or invalid JSON data from IPFS (optional)
      //   console.error("Empty or invalid JSON data from IPFS");
      // }
    }
    // console.log(data)
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












// const getAlloOwner = async () => {
//     try {
//         const alloOwner: string = await registry.getAlloOwner();
//         console.log(alloOwner);
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         throw error;
//       }
// };
// getAlloOwner();