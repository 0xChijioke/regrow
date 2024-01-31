import { useState } from "react";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProfileDetail } from "~~/types/types";

const UpdateName = ({ profile, refetch }: { profile: ProfileDetail, refetch: () => void }) => {
    const [name, setName] = useState<string>(profile.name || "");



    const { writeAsync: updateName, isLoading: isUpdatingName } = useScaffoldContractWrite({
        contractName: "Registry",
        functionName: "updateProfileName",
        args: [profile.id, name],
        blockConfirmations: 1,
        onBlockConfirmation: txnReceipt => {
            console.log("Transaction blockHash", txnReceipt.blockHash);
            refetch();
        },
    });

    
  const handleNameUpdate = async () => {
    await updateName();
    // You can add additional logic or UI updates after the update
  };

    

  return (
    <div>
    {/* Button to open modal for updating name */}
      <button className="rounded-lg" onClick={() => document.getElementById("nameModal").showModal()}>
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
              onClick={() => document.getElementById("nameModal").close()}
            >
              ✕
            </button>
            <div className="modal-content">
              <label>
                New Name:
                <InputBase placeholder="Profile name" value={name} required onChange={e => setName(e)} />
              </label>

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
  )
}

export default UpdateName