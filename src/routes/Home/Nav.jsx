import { Link } from "react-router-dom";

import "./Nav.scss";

const NavLink = ({ text, icon, to }) => {
  const getIcon = (icon) => {
    return require(`../../assets/nav/${icon}`).default;
  };

  return (
    <Link to={to}>
      <img src={getIcon(icon)} alt={text} />
      <span>{text}</span>
    </Link>
  );
};

const Nav = () => {
  return (
    <nav>
      <NavLink icon="school.svg" text="學校消息" to="/" />
      <NavLink icon="books.svg" text="記錄查詢" to="/" />
      <NavLink icon="student.svg" text="個人資料" to="/" />
    </nav>
  );
};

export default Nav;
