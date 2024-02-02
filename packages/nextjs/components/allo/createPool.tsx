import { useState } from 'react';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { useAccount } from 'wagmi';
import { InputBase, AddressInput } from '~~/components/scaffold-eth';
import toast from 'react-hot-toast';
import { Tmetadata } from '~~/types/types';

const CreatePool = ({profileId}: {profileId: string}) => {
  const { address } = useAccount();

  const [strategy, setStrategy] = useState<string>();
  const [initStrategyData, setInitStrategyData] = useState();
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState<bigint>();
  const [metadata, setMetadata] = useState<Tmetadata>();
  const [managers, setManagers] = useState(['']);

  const { writeAsync: createPoolWrite, isLoading: isCreatingPool, isMining } = useScaffoldContractWrite({
    contractName: 'Allo',
    functionName: 'createPoolWithCustomStrategy',
    args: [profileId, strategy, initStrategyData, token, amount, metadata, managers],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log('Transaction blockHash', txnReceipt.blockHash);
    },
  });

  const createPoolFunc = async () => {
    // validation logic

    try {
      await createPoolWrite();
      toast.success('Pool creation initiated.');
      // other actions after successful pool creation
    } catch (error) {
      console.error('Error creating pool:', error);
      toast.error('Error creating pool. Please try again.');
    }
  };

  const handleAddManager = () => {
    setManagers([...managers, '']);
  };

  const handleManagerChange = (index: number, value: string) => {
    const updatedManagers = [...managers];
    updatedManagers[index] = value;
    setManagers(updatedManagers);
  };

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      <div className="lg:w-[40%] w-[90%] rounded-xl bg-primary p-10">
        <h2 className="text-center font-semibold mb-5">Create Pool</h2>
        <form onSubmit={(e) => { e.preventDefault(); createPoolFunc(); }}>
          {/* input fields for pool creation */}
          
          <label className="flex flex-col mt-4">
            Managers:
            {managers.map((manager, index) => (
              <div className="my-2" key={index}>
                <AddressInput
                  value={manager}
                  onChange={(value) => handleManagerChange(index, value)}
                />
              </div>
            ))}
            <button className="flex justify-end" type="button" onClick={handleAddManager}>
              Add Manager
            </button>
          </label>

          {/* Button to submit */}
          <div className="flex w-full justify-center">
            <button className="btn rounded-lg" type="submit" disabled={isCreatingPool || isMining}>
              {isCreatingPool ? 'Creating Pool...' : 'Create Pool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePool;
