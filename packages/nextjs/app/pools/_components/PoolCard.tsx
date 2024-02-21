import Image from "next/image";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth";
import { PoolData } from "~~/types/types";

const PoolCard = ({ pool }: { pool: PoolData }) => {
  return (
    <div className="card w-90% lg:w-80 m-3 glass">
      <figure>
        <Image
          src="https://d16c97c2np8a2o.cloudfront.net/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte"
          alt="pool"
        />
      </figure>
      <div className="card-body flex flex-col">
        {/* <h2 className="card-title">Pool</h2> */}
        <div className="flex flex-col text-sm">
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
