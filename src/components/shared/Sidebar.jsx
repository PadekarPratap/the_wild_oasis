import { Link } from "react-router-dom";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <div className="p-4 w-64 md:flex flex-col border-r border-gray-300 sticky top-0 h-screen self-start hidden">
      {/* upper sidebar start  */}
      {/* logo */}
      <div className="mb-8">
        <Logo />
      </div>
      <div className="flex-grow">
        <MainNav />
      </div>
      {/* upper sidebar end  */}

      {/* lower sidebar start */}
      <div className="border-t border-gray-300">
        <Link className="text-xl font-medium block mt-3">Help Center</Link>
        <button className="text-xl font-medium block mt-3">Logout</button>
      </div>
      {/* lower sidebar end  */}
    </div>
  );
};
export default Sidebar;
