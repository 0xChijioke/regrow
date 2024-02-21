import React, { useState } from "react";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProfileDetail } from "~~/types/types";

const ManageMembers = ({ profile, refetch }: { profile: ProfileDetail; refetch: () => void }) => {
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
  const [newMemberAddress, setNewMemberAddress] = useState<string>("");
  const [removeMemberAddress, setRemoveMemberAddress] = useState<string>("");

  const { writeAsync: addMembers, isLoading: isAddingMembers } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "addMembers",
    args: [profile.id as `0x${string}`, [newMemberAddress]],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      refetch();
    },
  });

  const { writeAsync: removeMembers, isLoading: isRemovingMembers } = useScaffoldContractWrite({
    contractName: "Registry",
    functionName: "removeMembers",
    args: [profile.id as `0x${string}`, [removeMemberAddress]],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      refetch();
    },
  });

  const handleAddMembers = async () => {
    await addMembers();
  };

  const handleRemoveMembers = async () => {
    await removeMembers();
  };

  return (
    <div>
      {/* Button to open modal for managing members */}
      <button
        className="rounded-lg"
        onClick={() => {
          const membersModal = document.getElementById("membersModal") as HTMLDialogElement | null;
          if (membersModal) {
            membersModal.showModal();
          }
        }}
      >
        Manage Members
      </button>
      <dialog id="membersModal" className="modal">
        <div className="modal-box">
          {/* Tabs for managing members */}
          <div role="tablist" className="tabs flex justify-center tabs-bordered">
            <div
              role="tab"
              className={`tab ${activeTab === "add" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("add")}
            >
              Add
            </div>
            <div
              role="tab"
              className={`tab ${activeTab === "remove" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("remove")}
            >
              Remove
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "add" && (
            <form
              method="dialog"
              onSubmit={e => {
                e.preventDefault();
                handleAddMembers();
              }}
            >
              <div className="modal-content">
                <label>
                  Add Member:
                  <AddressInput
                    placeholder="New member address"
                    value={newMemberAddress}
                    onChange={e => setNewMemberAddress(e)}
                  />
                </label>
                {isAddingMembers && <p>Adding member...</p>}
              </div>
              <div className="modal-actions py-3">
                <button type="submit" className="btn rounded-lg btn-primary">
                  Add Member
                </button>
              </div>
            </form>
          )}

          {activeTab === "remove" && (
            <form
              method="dialog"
              onSubmit={e => {
                e.preventDefault();
                handleRemoveMembers();
              }}
            >
              <div className="modal-content">
                <label>
                  Remove Member:
                  <AddressInput
                    placeholder="Member address to remove"
                    value={removeMemberAddress}
                    onChange={e => setRemoveMemberAddress(e)}
                  />
                </label>
                {isRemovingMembers && <p>Removing member...</p>}
              </div>
              <div className="modal-actions py-3">
                <button type="submit" className="btn rounded-lg btn-primary">
                  Remove Member
                </button>
              </div>
            </form>
          )}

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              const membersModal = document.getElementById("membersModal") as HTMLDialogElement | null;
              if (membersModal) {
                membersModal.close();
              }
            }}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ManageMembers;
