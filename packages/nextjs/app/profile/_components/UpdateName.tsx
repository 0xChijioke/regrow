import { useState } from "react";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProfileDetail } from "~~/types/types";

const UpdateName = ({ profile, refetch }: { profile: ProfileDetail; refetch: () => void }) => {
  const [name, setName] = useState<string>(profile.name || "");

  const { writeAsync: updateName, isLoading: isUpdatingName } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "updateProfileName",
    args: [profile.id as `0x${string}`, name],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      refetch();
    },
  });

  const handleNameUpdate = async () => {
    await updateName();
  };

  return (
    <div>
      <button
        className="rounded-lg"
        onClick={() => {
          const nameModal = document.getElementById("nameModal") as HTMLDialogElement | null;
          if (nameModal) {
            nameModal.showModal();
          }
        }}
      >
        Update Name
      </button>
      <dialog id="nameModal" className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            onSubmit={e => {
              e.preventDefault();
              handleNameUpdate();
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const nameModal = document.getElementById("nameModal") as HTMLDialogElement | null;
                if (nameModal) {
                  nameModal.close();
                }
              }}
            >
              ✕
            </button>
            <div className="modal-content">
              <label>
                New Name:
                <InputBase placeholder="Profile name" value={name} onChange={e => setName(e)} />
              </label>

              <p className="text-sm text-warning mt-2">
                Note: Updating the profile name will generate a new anchor address.
              </p>

              {isUpdatingName && <p>Updating name...</p>}
              {/* {nameUpdateError && (
                <p>Error updating name: {nameUpdateError.message}</p>
              )} */}
            </div>
            <div className="modal-actions py-3">
              <button type="submit" className="btn rounded-lg btn-primary">
                Update Name
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateName;
