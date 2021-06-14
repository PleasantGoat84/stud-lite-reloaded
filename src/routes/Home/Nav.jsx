import { NavLink } from "react-router-dom";

const Tab = ({ text, icon, to, exact }) => {
  const getIcon = (icon) => {
    return require(`../../assets/nav/${icon}`).default;
  };

  return (
    <NavLink
      to={`/home${to}`}
      exact={exact}
      className="flex flex-col items-center text-browny flex-grow p-1 w-0 h-full"
      activeClassName="text-secondary font-bold underline"
    >
      <img
        src={getIcon(icon)}
        alt={text}
        className="w-full flex-grow min-h-0"
      />
      <span className="text-sm">{text}</span>
    </NavLink>
  );
};

const Nav = () => {
  return (
    <nav className="flex items-center fixed bg-light w-full bottom-0 h-20 p-1 z-20 shadow-md border-t-2">
      <Tab icon="school.svg" text="學校消息" to="/" exact />
      <Tab icon="books.svg" text="記錄瀏覽" to="/records/" />
      <Tab icon="student.svg" text="個人資料" to="/profile/" />
    </nav>
  );
};

export default Nav;
