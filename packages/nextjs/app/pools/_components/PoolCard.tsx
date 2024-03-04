import Image from "next/image";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth";
import { PoolData } from "~~/types/types";

const PoolCard = ({ pool }: { pool: PoolData }) => {
  return (
    <div className="card w-90% lg:w-80 m-3 glass">
      <figure className="items-center">
        <Image
          src="https://gateway.pinata.cloud/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte"
          width={340}
          height={40}
          alt="pool-image"
          placeholder="blur"
          blurDataURL="https://gateway.pinata.cloud/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte"
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
        <div className="">
          <Link href={`/pool/${pool.id}`} key={pool.id}>
            <button className="btn rounded-xl tracking-wide text-sm w-full btn-primary">More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
