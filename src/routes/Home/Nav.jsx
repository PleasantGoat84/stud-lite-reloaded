import { NavLink } from "react-router-dom";

import "./Nav.scss";

const Tab = ({ text, icon, to, exact }) => {
  const getIcon = (icon) => {
    return require(`../../assets/nav/${icon}`).default;
  };

  return (
    <NavLink to={`/home${to}`} exact={exact} activeClassName="active">
      <img src={getIcon(icon)} alt={text} />
      <span>{text}</span>
    </NavLink>
  );
};

const Nav = () => {
  return (
    <nav>
      <Tab icon="school.svg" text="學校消息" to="/" exact />
      <Tab icon="books.svg" text="記錄瀏覽" to="/records/" />
      <Tab icon="student.svg" text="個人資料" to="/profile/" />
    </nav>
  );
};

export default Nav;
