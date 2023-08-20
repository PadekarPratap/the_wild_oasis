import Avatar from "./Avatar";
import HeaderIcons from "./HeaderIcons";

const Header = () => {
  return (
    <header className="bg-white w-full h-16 sticky top-0">
      <div className="px-5 h-full justify-end flex items-center gap-8">
        <div>
          <Avatar />
        </div>
        <HeaderIcons />
      </div>
    </header>
  );
};
export default Header;
