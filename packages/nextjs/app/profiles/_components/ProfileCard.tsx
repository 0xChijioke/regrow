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
          src={`${process.env.NEXT_PUBLIC_IPFS_READ_GATEWAY}/ipfs/bafkreifmllagjfloblieklder7xv56cqdtdaw3zydms6n7nwjhzw3byrte`}
          alt="profile-image"
          width={340}
          height={40}
          priority={true}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{profile.name}</h2>
        <div className="justify-end">
          Owner <Address address={profile.owner.id} />
        </div>
        <div className="card-actions justify-end">
          <Link href={`/profile/${profile.id}`} key={profile.id}>
            <button className="btn p-2 rounded-xl tracking-wide text-sm btn-primary">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
