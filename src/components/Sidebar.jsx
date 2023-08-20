import Logo from "./Logo";
import MainNav from "./MainNav";

const SideBar = () => {
  return (
    <aside className="md:w-[300px] h-[calc(100vh-4rem)] sticky top-16 hidden md:block">
      <Logo />

      <MainNav />
    </aside>
  );
};
export default SideBar;
