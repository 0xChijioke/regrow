import Image from "next/image";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth";
import { Profile } from "~~/types/types";

const ProfileCard = ({ profile }: { profile: Profile }) => {
  // rendering logic for a single profile card
  return (
    <div className="card w-90% lg:w-80 m-3 glass">
      <figure className="items-center">
        <Image
          src="https://gateway.pinata.cloud/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte"
          width={340}
          height={40}
          alt="profile-image"
          placeholder="blur"
          blurDataURL="https://gateway.pinata.cloud/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte"
          priority={true}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{profile.name}</h2>
        <div className="justify-end">
          Owner <Address address={profile.owner.id} />
        </div>
        <div className="">
          <Link href={`/profile/${profile.id}`} key={profile.id}>
            <button className="btn rounded-xl tracking-wide text-sm w-full btn-primary">More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
