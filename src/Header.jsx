import Icon from "./assets/icon.svg";

const Header = ({ mini }) => {
  return (
    <header
      className={`flex justify-center items-center bg-primary text-secondary fixed z-30 shadow-lg py-3 w-full ${
        mini ? " mini" : ""
      }`}
    >
      <img src={Icon} alt="StudLite Icon" id="icon" className="w-10 mr-3" />
      <h1 className="text-2xl font-semibold">StudLite</h1>
    </header>
  );
};

export default Header;
