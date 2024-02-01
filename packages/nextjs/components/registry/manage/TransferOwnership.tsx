import { useState } from "react";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const TransferOwnership = ({ profileId, refetch }: { profileId: string, refetch: () => void }) => {
    const [pendingOwner, setPendingOwner] = useState<string>("");

    const { writeAsync: updatePendingOwner, isLoading: isUpdatingPendingOwner } = useScaffoldContractWrite({
        contractName: "Registry",
        functionName: "updateProfilePendingOwner",
        args: [profileId, pendingOwner],
        blockConfirmations: 1,
        onBlockConfirmation: txnReceipt => {
            console.log("Transaction blockHash", txnReceipt.blockHash);
            refetch();
        },
    });

    const handleTransferOwnership = async () => {
        await updatePendingOwner();
        // You can add additional logic or UI updates after the update
    };

    return (
        <div>
            {/* Button to open modal for transferring ownership */}
            <button className="rounded-lg" onClick={() => document.getElementById("transferModal").showModal()}>
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
                            onClick={() => document.getElementById("transferModal").close()}
                        >
                            ✕
                        </button>
                        <div className="modal-content">
                            <label>
                                New Pending Owner:
                                <AddressInput value={pendingOwner} required onChange={e => setPendingOwner(e)} />
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
}

export default TransferOwnership;
