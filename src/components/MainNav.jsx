import { NavLink } from "react-router-dom";
import {
  HiCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const MainNav = () => {
  return (
    <nav className="px-4">
      <ul className="flex flex-col gap-2 items-stretch">
        <li>
          <NavLink to="dashboard" className="link-style group">
            <HiOutlineHome
              className="inline group-hover:text-indigo-600"
              size={25}
            />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="link-style group">
            <HiOutlineHomeModern
              className="inline group-hover:text-indigo-600"
              size={25}
            />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="link-style group">
            <HiCalendarDays
              className="inline group-hover:text-indigo-600"
              size={25}
            />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="link-style group">
            <HiOutlineUsers
              className="inline group-hover:text-indigo-600"
              size={25}
            />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="link-style group">
            <IoSettingsOutline
              className="inline group-hover:text-indigo-600"
              size={25}
            />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MainNav;
