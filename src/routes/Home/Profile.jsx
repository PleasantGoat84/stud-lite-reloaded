import "./Profile.scss";

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

  return <img src={iconSrc} alt={gender} className="gender" />;
};

const UserCard = ({ avatar, display, gender, id }) => {
  return (
    <div className="user-card">
      <div className="avatar-container">
        <img src={avatar} alt={display} className="avatar" />
        <GenderIcon gender={gender} />
      </div>
      <div className="displays">
        <h2 title={display}>{display}</h2>
        <h3>{id}</h3>
      </div>
      <Link to="./">
        <img src={editIcon} alt="Edit" className="edit" />
      </Link>
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <UserCard
        avatar={avatarImg}
        display={user && user.display}
        gender={user && user.gender}
        id={user && user.id}
      />
    </div>
  );
};

export default Profile;
