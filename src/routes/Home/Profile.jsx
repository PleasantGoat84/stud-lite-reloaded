import React from "react";

import "./Profile.scss";

const GenderIcon = ({ gender }) => {
  let iconSrc = "";

  switch (gender) {
    case "男":
      iconSrc = require("../../assets/gender/man.svg").default;
      break;

    case "女":
      iconSrc = require("../../assets/gender/woman.svg").default;
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
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <UserCard
        avatar="https://cdn.discordapp.com/avatars/578869529783042048/a02c08a2f068822669d05495f682a007.webp?size=128"
        display={user && user.display}
        gender={user && user.gender}
        id={user && user.id}
      />
    </div>
  );
};

export default Profile;
