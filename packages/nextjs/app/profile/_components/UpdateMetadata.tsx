import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProfileDetail, Tmetadata } from "~~/types/types";

const UpdateMetadata = ({ profile }: { profile: ProfileDetail }) => {
  const [description, setDescription] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(); // has type string as placeholder
  const [
    metadata,
    // setMetadata
  ] = useState<Tmetadata>();

  const {
    // writeAsync: updateMetadata,
    isLoading: isUpdatingMetadata,
  } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "updateProfileMetadata",
    args: [profile.id as `0x${string}`, metadata],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // const handleMetadataUpdate = async () => {

  // };

  const characterLimit = 600;

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
    <div className="flex justify-between">
      {/* Button to open modal for updating description and image */}
      <button
        className="rounded-lg"
        onClick={() => {
          const metadataModal = document.getElementById("metadataModal") as HTMLDialogElement | null;
          if (metadataModal) {
            metadataModal.showModal();
          }
        }}
      >
        Update Metadata
      </button>
      <dialog id="metadataModal" className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            onSubmit={e => {
              e.preventDefault();
              // handleMetadataUpdate();
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const metadataModal = document.getElementById("metadataModal") as HTMLDialogElement | null;
                if (metadataModal) {
                  metadataModal.close();
                }
              }}
            >
              ✕
            </button>
            <div className="modal-content">
              <label className="block">Description:</label>
              <textarea
                className="textarea textarea-bordered bg-base-200 h-[2.2rem] min-h-[6.2rem] px-4 w-full font-medium placeholder:text-gray/50 rounded-lg"
                placeholder={`Enter Reason (limit: ${characterLimit} characters)`}
                value={description}
                onChange={e => handleDescriptionChange(e.target.value)}
              ></textarea>
              <p className="font-sans italic font-normal -mt-1">
                Remaining characters: {characterLimit - description.length}
              </p>
              <br />

              <label className="block mt-4">Profile Image:</label>
              <div className="flex items-center justify-center" onDragOver={handleDragOver} onDrop={handleDrop}>
                <label className="flex items-center w-[100%] bg-base-200 justify-center h-32 border-2 border-primary border-dashed rounded-md cursor-pointer hover:border-white">
                  <input type="file" className="hidden w-full" onChange={e => setProfileImage(e.target.value)} />
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
              <div>{profileImage && <span>{profileImage}</span>}</div>
              {isUpdatingMetadata && <p>Updating metadata...</p>}
              {/* {metadataUpdateError && (
                <p>Error updating metadata: {metadataUpdateError.message}</p>
              )} */}
            </div>
            <div className="modal-actions my-4">
              <button type="submit" className="btn rounded-lg btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateMetadata;
