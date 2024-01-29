import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { AddressInput, InputBase } from "../scaffold-eth";
import toast from "react-hot-toast";
import { usePublicClient } from "wagmi";
import { Tmetadata } from "~~/types/types";



const CreateProfile = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient()

    const [nonce, setNonce] = useState<bigint>();
    const [name, setName] = useState<string>("");
    const [metadata, setMetadata] = useState<Tmetadata>();
    const [owner, setOwner] = useState<string>("");
    const [members, setMembers] = useState<string[]>([]);
    // Data for metadata
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState('');
    // State for handling loading and success/error messages
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const characterLimit = 600;
  


    const { writeAsync: createProfileWrite, isLoading: isCreatingProfile, isMining } = useScaffoldContractWrite({
        contractName: "Registry",
        functionName: "createProfile",
        args: [
            nonce,
            name,
            metadata,
            owner,
            members
        ],
        // value: parseEther("0.1"),
        blockConfirmations: 1,
        onBlockConfirmation: txnReceipt => {
          console.log("Transaction blockHash", txnReceipt.blockHash);
        },
    });
  
    
    const createProfileFunc = async () => {
      
      // Validate inputs
      if (!name || !address) {
        toast.error('Invalid parameters.');
        return;
      }
      // Set nouce
      const result = await publicClient.getTransactionCount({
        address: address
      })
      setNonce(BigInt(result))

      // Set owner
      setOwner(address);

      // Set metadata(dummy for now)
      setMetadata({protocol: BigInt("1"), pointer: "Test case"})

  
      // Additional validation logic can be added as needed
      console.log("nounce: ", nonce)
      console.log("name: ", name)
      console.log("owner: ", owner)
      console.log("members: ", members)
      console.log("metadata: ", metadata)

   
      // Call the createProfileWrite hook
      try {
        await createProfileWrite();
        // If the above line executes successfully, it means the transaction was sent.
        // You might want to provide additional feedback based on the success.
        toast.success('Profile creation initiated.');
        setNonce(undefined);
        setName('');
        setMembers([]);
        setMetadata(undefined);
      } catch (error) {
        // Handle error cases
        console.error('Error creating profile:', error);
        toast.error('Error creating profile. Please try again.');
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
      if (file) {
          setProfileImage(file.name);
          // Add logic to handle file upload
      }
    };
  

  


  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">

      <div className="lg:w-[40%] w-[90%] rounded-xl bg-primary p-10">
        <h2 className="text-center font-semibold mb-5">Create Profile</h2>
        {/* Add form elements for profile creation */}
        <form onSubmit={(e) => { e.preventDefault(); createProfileFunc(); }}>
          {/* Add input fields for name, description, profile image, owner, and members */}
          <label>
            Name:
            <InputBase placeholder="Profile name" value={name} onChange={(e) => setName(e)} />
          </label>
          <br />

          <label className="block">Description:</label>

            <textarea
              className="textarea textarea-bordered bg-base-200 h-[2.2rem] min-h-[6.2rem] px-4 w-full font-medium placeholder:text-gray/50 rounded-lg"
              placeholder={`Enter Reason (limit: ${characterLimit} characters)`}
              value={description}
              onChange={e => handleDescriptionChange(e.target.value)}
            ></textarea>
            <p className="font-sans italic font-normal -mt-1">Remaining characters: {characterLimit - description.length}</p>
          <br />

          <label className="block mt-4">
            Profile Image:
          </label>
          <div
            className="flex items-center justify-center mt-2"            
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
                <label className="flex items-center w-[100%] bg-base-200 justify-center w-32 h-32 border-2 border-primary border-dashed rounded-md cursor-pointer hover:border-white">
                    <input type="file" className="hidden w-full" onChange={(e) => setProfileImage(e.target.value)} />
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
                </label>
            </div>
            <div>
              {profileImage && (
                  <span>{profileImage}</span>
              )}
            </div>

          <br />
          {/* <label>
            Owner:
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
          </label> */}
          <br />

          <label className="flex flex-col">
            Members:
            {members.map((member, index) => (
                <div className="my-2" key={index}>
                    <AddressInput
                        value={member}
                        onChange={(value) => handleMemberChange(index, value)}
                    />
                </div>
            ))}

            <button className="flex justify-end" type="button" onClick={handleAddMember}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </label>
          <br />
  
          {/* Button to submit the form */}
          <div className="flex w-full justify-center">
            <button className="btn rounded-lg" type="submit" disabled={isLoading || isMining}>
              {isLoading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
  
        {/* Display success or error message */}
        {isSuccess && <p>Profile created successfully!</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
      );
}

export default CreateProfile