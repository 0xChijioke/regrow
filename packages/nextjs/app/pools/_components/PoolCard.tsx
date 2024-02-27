import Image from "next/image";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth";
import { PoolData } from "~~/types/types";

const PoolCard = ({ pool }: { pool: PoolData }) => {
  return (
    <div className="card w-90% lg:w-80 m-3 glass">
      <figure className="items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_IPFS_READ_GATEWAY}/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte`}
          alt="pool"
          width={340}
          height={40}
          priority={true}
        />
      </figure>
      <div className="card-body flex flex-col">
        {/* <h2 className="card-title">Pool</h2> */}
        <div className="flex flex-col py-2 text-sm">
          <p>Amount: Ξ {pool.amount}</p>
          <div className="whitespace-nowrap flex gap-x-1">
            Strategy: <Address address={pool.strategy} />
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link href={`/pool/${pool.id}`} key={pool.id}>
            <button className="btn p-2 rounded-xl tracking-wide text-sm btn-primary">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
