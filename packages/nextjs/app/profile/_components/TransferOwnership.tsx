import { useState } from "react";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const TransferOwnership = ({ profileId, refetch }: { profileId: string; refetch: () => void }) => {
  const [pendingOwner, setPendingOwner] = useState<string>("");

  const { writeAsync: updatePendingOwner, isLoading: isUpdatingPendingOwner } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "updateProfilePendingOwner",
    args: [profileId as `0x${string}`, pendingOwner],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      refetch();
    },
  });

  const handleTransferOwnership = async () => {
    await updatePendingOwner();
  };

  return (
    <div>
      {/* Button to open modal for transferring ownership */}
      <button
        className="rounded-lg"
        onClick={() => {
          const transferModal = document.getElementById("transferModal") as HTMLDialogElement | null;
          if (transferModal) {
            transferModal.showModal();
          }
        }}
      >
        Transfer Ownership
      </button>
      <dialog id="transferModal" className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            onSubmit={e => {
              e.preventDefault();
              handleTransferOwnership();
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const transferModal = document.getElementById("transferModal") as HTMLDialogElement | null;
                if (transferModal) {
                  transferModal.close();
                }
              }}
            >
              ✕
            </button>
            <div className="modal-content">
              <label>
                New Pending Owner:
                <AddressInput value={pendingOwner} onChange={e => setPendingOwner(e)} />
              </label>

              {isUpdatingPendingOwner && <p>Setting pending owner...</p>}
            </div>
            <div className="modal-actions py-3">
              <button type="submit" className="btn rounded-lg btn-primary">
                Transfer
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TransferOwnership;
