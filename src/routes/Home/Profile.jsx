import manIcon from "../../assets/gender/man.svg";
import womanIcon from "../../assets/gender/woman.svg";
import editIcon from "../../assets/write.svg";

import avatarImg from "../../assets/icon.jfif";
import { Link } from "react-router-dom";

const GenderIcon = ({ gender }) => {
  let iconSrc = "";

  switch (gender) {
    case "男":
      iconSrc = manIcon;
      break;

    case "女":
      iconSrc = womanIcon;
      break;

    default:
      break;
  }

  return (
    <img
      src={iconSrc}
      alt={gender}
      className="absolute -right-4 -bottom-1 w-8"
    />
  );
};

const UserCard = ({ avatar, display, gender, id }) => {
  return (
    <div className="flex items-center bg-browny text-white px-6 py-8">
      <div className="avatar-container w-20 relative h-20">
        <img
          src={avatar}
          alt={display}
          className="w-full h-full rounded-xl border-4 border-light shadow-lg"
        />
        <GenderIcon gender={gender} />
      </div>
      <div className="flex flex-col flex-grow h-4/5 ml-5">
        <h2
          title={display}
          className="overflow-ellipsis whitespace-nowrap overflow-hidden my-1 text-2xl font-bold"
        >
          {display}
        </h2>
        <h3 className="text-lg">{id}</h3>
      </div>
      <Link to="./">
        <img src={editIcon} alt="Edit" className="w-8" />
      </Link>
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <div className="-mt-6">
      <UserCard
        avatar={avatarImg}
        display={user?.display}
        gender={user?.gender}
        id={user?.id}
      />
    </div>
  );
};

export default Profile;
