import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";
import { useSignout } from "../hooks/auth/useSignout";
import { FiSun } from "react-icons/fi";
import { useThemeProvider } from "../hooks/useThemeProvider";

const HeaderIcons = () => {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useThemeProvider();

  // signout
  const { signingOut, signout } = useSignout();

  const handleLogout = () => {
    signout();
  };

  return (
    <ul className="flex items-center gap-1">
      <li>
        <button
          className="p-3 rounded-md dark:text-colorBrand500 dark:hover:bg-slate-800 hover:bg-colorBrand50 disabled:cursor-not-allowed"
          onClick={() => navigate("/account")}
        >
          <CiUser size={20} />
        </button>
      </li>
      <li>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-md dark:text-colorBrand500 dark:hover:bg-slate-800 hover:bg-colorBrand50 disabled:cursor-not-allowed"
        >
          {theme === "dark" ? <HiOutlineMoon size={20} /> : <FiSun size={20} />}
        </button>
      </li>
      <li>
        <button
          className="p-3 rounded-md dark:text-colorBrand500 dark:hover:bg-slate-800 hover:bg-colorBrand50 disabled:cursor-not-allowed"
          onClick={handleLogout}
          disabled={signingOut}
        >
          <FiLogOut size={20} />
        </button>
      </li>
    </ul>
  );
};
export default HeaderIcons;
