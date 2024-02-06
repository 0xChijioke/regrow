import { pinata } from "~~/utils/request";
import { PinataPinOptions, PinataPinResponse } from "@pinata/sdk";

export async function pinImageToIPFS(profileImage: File, pinataOptions?: PinataPinOptions): Promise<string> {
  const stream = new ReadableStream({
    start(controller) {
      const reader = new FileReader();
      reader.onload = function () {
        const arrayBuffer = this.result;
        controller.enqueue(arrayBuffer as ArrayBuffer);
        controller.close();
      };
      reader.readAsArrayBuffer(profileImage);
    },
  });

  try {
    const imageCID: PinataPinResponse = await pinata.pinFileToIPFS(stream, pinataOptions);
    return imageCID.IpfsHash;
  } catch (error) {
    console.error('Error uploading image to IPFS:', error);
    throw new Error('Error uploading image. Please try again.');
  }
}
