import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { usePublicClient } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Tmetadata } from "~~/types/types";

// import { IPFSClient, pinata } from "~~/utils/request";

const CreateProfile = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [nonce, setNonce] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [metadata, setMetadata] = useState<Tmetadata>();
  const [owner, setOwner] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  useEffect(() => {
    setMetadata({
      protocol: BigInt("1"),
      pointer: "bafybeid47tux23bnyljcgm3jw3ifimaojazgknnjre7m4pcaiw5gommvta",
    }); // Dummy metadata
  }, []);
  // Data for metadata
  const [description, setDescription] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>();
  // State for handling loading and success/error messages
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const characterLimit = 600;

  const {
    writeAsync: createProfileWrite,
    isLoading,
    isMining,
  } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "createProfile",
    args: [BigInt(nonce), name, metadata, owner, members],
    // value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // useScaffoldEventSubscriber({
  //   contractName: "Registry",
  //   eventName: "ProfileCreated",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { profileId, nonce, name, metadata, owner, anchor );
  //      } = log.args;
  //       console.log("📡 GreetingChange event", profileId, nonce, name, metadata, owner, anchor);
  //     });
  //   },
  // });

  useEffect(() => {
    if (address) {
      const computeNonce = async () => {
        const result = await publicClient.getTransactionCount({
          address: address,
        });
        // Set nonce
        setNonce(result);

        // Set owner
        setOwner(address);
      };
      computeNonce();
    }
  }, [address, nonce, publicClient]);

  const createProfileFunc = async () => {
    // Validate inputs
    if (!name || !address) {
      toast.error("Connect your wallet and Input profile name.");
      return;
    }

    // Upload image to IPFS
    // let imageCID = '';
    //   if (profileImage) {
    //     try {
    //       const imageBlob = new Blob([profileImage], { type: profileImage.type });

    //       imageCID = await IPFSClient.pinFile(imageBlob);
    //       console.log(imageCID)
    //     } catch (error) {
    //       console.error('Error uploading image to IPFS:', error);
    //       toast.error('Error uploading image. Please try again.');
    //       return;
    //     }
    //   }

    //   // Upload metadata to IPFS
    // try {
    //   const metadataCID = await pinata.pinJSONToIPFS({
    //     name,
    //     description,
    //     profileImage: imageCID,
    //   });
    //   setMetadata({protocol: BigInt('1'), pointer: metadataCID.IpfsHash});
    // } catch (error) {
    //   console.error('Error uploading metadata to IPFS:', error);
    //   toast.error('Error creating profile. Please try again.');
    //   return;
    // }

    // Additional validation logic ?
    console.log("nonce: ", nonce);
    console.log("name: ", name);
    console.log("owner: ", owner);
    console.log("members: ", members);
    console.log("metadata: ", metadata);

    try {
      if (!nonce || nonce === 0 || !owner || !metadata) {
        throw new Error("Invalid parameters.");
      }

      await createProfileWrite();

      // Why is the returned Id not valid?
      // console.log(profileId)
      // Navigate to the newly created profile page
      // if (profileId) {
      //   router.push(`/profile/${profileId}`);
      // }
    } catch (error) {
      // Handle error
      console.error("Error creating profile:", error);
      toast.error("Error creating profile. Please try again.");
    } finally {
      setNonce(0);
      setName("");
      setMembers([]);
    }
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const handleDescriptionChange = (value: string) => {
    const inputText = value;

    if (inputText.length <= characterLimit) {
      setDescription(inputText);
    } else return;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setProfileImage(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      <div className="lg:w-[40%] w-[90%] rounded-xl bg-primary p-6">
        <h2 className="text-center text-3xl font-semibold mb-5">Create Profile</h2>
        {/* form elements for profile creation */}
        <form
          onSubmit={e => {
            e.preventDefault();
            createProfileFunc();
          }}
        >
          {/* input fields for name, description, profile image, and members */}
          <label>
            Name:
            <InputBase placeholder="Profile name" value={name} onChange={e => setName(e)} />
          </label>
          <br />

          <label className="block">Description:</label>

          <textarea
            className="textarea textarea-bordered bg-base-200 h-[2.2rem] min-h-[6.2rem] px-4 w-full font-medium placeholder:text-gray/50 rounded-lg"
            placeholder={`Enter description (limit: ${characterLimit} characters)`}
            value={description}
            onChange={e => handleDescriptionChange(e.target.value)}
          ></textarea>
          <p className="font-sans italic font-normal -mt-1">
            Remaining characters: {characterLimit - description.length}
          </p>
          <br />

          <label className="block mt-4">Profile Image:</label>
          <div className="flex items-center justify-center mt-2" onDragOver={handleDragOver} onDrop={handleDrop}>
            <label className="flex items-center w-[100%] bg-base-200 justify-center h-32 border-2 border-primary border-dashed rounded-md cursor-pointer hover:border-white">
              <input type="file" className="hidden w-full" onChange={handleFileInputChange} />
              {profileImage ? (
                // Display image
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-md border-dashed border-primary"
                />
              ) : (
                // "Choose a file" icon and text
                <>
                  <span className="text-gray-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                  <span className="ml-2 text-gray-500">Choose a file</span>
                </>
              )}
            </label>
          </div>
          <div>{profileImage && <div className="mt-2">{profileImage.name}</div>}</div>

          <br />

          <label className="flex flex-col">
            Members:
            {members.map((member, index) => (
              <div className="my-2" key={index}>
                <AddressInput value={member} onChange={value => handleMemberChange(index, value)} />
              </div>
            ))}
            <button className="flex justify-end" type="button" onClick={handleAddMember}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </label>
          <br />

          {/* Button to submit */}
          <div className="flex w-full justify-center">
            <button className="btn rounded-lg" type="submit" disabled={!name || isLoading || isMining}>
              {isLoading ? "Creating Profile..." : "Create Profile"}
            </button>
          </div>
        </form>

        {/* success or error message */}
        {/* {isSuccess && <p>Profile created successfully!</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
      </div>
    </div>
  );
};

export default CreateProfile;
