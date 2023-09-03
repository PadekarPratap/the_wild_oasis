import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";
import { PiGearLight } from "react-icons/pi";

// eslint-disable-next-line
export const links = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: <AiOutlineHome size={25} />,
  },
  {
    id: 2,
    name: "Cabins",
    link: "/cabins",
    icon: <HiOutlineHomeModern size={25} />,
  },
  {
    id: 3,
    name: "Bookings",
    link: "/bookings",
    icon: <BsCalendar3 size={25} />,
  },
  {
    id: 4,
    name: "Guests",
    link: "/guests",
    icon: <HiOutlineUsers size={25} />,
  },
  {
    id: 5,
    name: "Users",
    link: "/create-user",
    icon: <FaRegCircleUser size={25} />,
  },
  {
    id: 6,
    name: "Settings",
    link: "/settings",
    icon: <PiGearLight size={25} />,
  },
];

const MainNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.id} className="text-xl font-medium tracking-wide">
            <NavLink
              to={link.link}
              className="w-full hover:bg-colorBrand100 text-gray-600 hover:text-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg dark:text-white dark:hover:bg-slate-900"
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MainNav;
