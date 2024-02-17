import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const AcceptOwnership = ({ profileId, refetch }: { profileId: string, refetch: () => void }) => {
    const { writeAsync: acceptOwnership, isLoading: isAcceptingOwnership, isMining } = useScaffoldContractWrite({
        contractName: "Registry",
        functionName: "acceptProfileOwnership",
        args: [profileId],
        blockConfirmations: 1,
        onBlockConfirmation: (txnReceipt) => {
            console.log("Transaction blockHash", txnReceipt.blockHash);
            refetch();
        },
    });

    const handleAcceptOwnership = async () => {
        profileId && await acceptOwnership();
    };

    return (
        <div>
            <button className="rounded-lg flex justify-center btn" onClick={handleAcceptOwnership} disabled={isAcceptingOwnership}>
                {isAcceptingOwnership || isMining ? <span className="loading loading-spinner loading-lg"></span> : 'Accept Ownership'}
            </button>
        </div>
    );
};

export default AcceptOwnership;
