import { CiUser } from "react-icons/ci";
import { GiMoon } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

const HeaderIcons = () => {
  return (
    <div className="space-x-2">
      <button className="hover:bg-gray-100 p-2 rounded-md hover:text-indigo-600">
        <CiUser size={30} />
      </button>
      <button className="hover:bg-gray-100 p-2 rounded-md hover:text-indigo-600">
        <GiMoon size={30} />
      </button>
      <button className="hover:bg-gray-100 p-2 rounded-md hover:text-indigo-600">
        <HiOutlineLogout size={30} />
      </button>
    </div>
  );
};
export default HeaderIcons;
