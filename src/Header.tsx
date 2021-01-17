import Icon from "./assets/icon.svg";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <img src={Icon} alt="StudLite Icon" id="icon" />
      <h1>StudLite</h1>
    </header>
  );
};

export default Header;
