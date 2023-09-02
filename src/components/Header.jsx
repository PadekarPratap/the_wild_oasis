import { useState } from "react";
import Avatar from "./Avatar";
import HeaderIcons from "./HeaderIcons";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Logo from "./Logo";
import { links } from "./MainNav";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-16 sticky top-0 dark:bg-slate-700 dark:text-white bg-white px-4 flex items-center border-b border-gray-300 dark:border-slate-800 justify-between md:justify-end shadow gap-4 z-[99999]">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden dark:text-colorBrand500"
        >
          <HiOutlineMenuAlt1 size={20} />
        </button>
        <div className="md:block hidden">
          <Avatar />
        </div>
        <HeaderIcons />
      </div>

      {/* mobile sidebar  */}

      {/* overlay  */}
      {open && (
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="fixed inset-0 duration-300 z-[99999] bg-black/25"
        />
      )}

      {/* sidebar  */}
      <div
        className={`fixed h-full  w-60 bg-white z-[99999] p-4 transition-all duration-500 top-0 ${
          open ? "left-0" : "-left-[200%]"
        }`}
      >
        <Logo />

        <div className="mt-8">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <NavLink
                  className="flex hover:bg-colorBrand50 px-4 py-3 rounded-lg items-center gap-4"
                  to={link.link}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
