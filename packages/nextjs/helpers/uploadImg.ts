import { IPFSClient } from "../utils/request";

// function for handling IPFS upload
export const uploadImageToIPFS = async (file: Blob): Promise<string> => {
    try {
      const result = await IPFSClient.pinFile(file);
      return result.IpfsHash;
    } catch (error) {
      throw new Error('Error uploading image to IPFS. Please try again.');
    }
  };