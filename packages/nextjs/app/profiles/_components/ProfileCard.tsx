import { Profile } from "~~/types/types";
import { Address } from "~~/components/scaffold-eth";
import Link from "next/link";


 const ProfileCard = ({ profile }: { profile: Profile }) => {
    // rendering logic for a single profile card
     return (
            <div className="card w-90% lg:w-80 m-3 glass">
                <figure>
                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{profile.name}</h2>
                    <div className="justify-end">Owner <Address address={profile.owner.id} /></div>
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