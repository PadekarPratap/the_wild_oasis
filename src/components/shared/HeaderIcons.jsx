import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";

const icons = [
  {
    id: 1,
    icon: <CiUser size={20} />,
  },
  {
    id: 2,
    icon: <HiOutlineMoon size={20} />,
  },
  {
    id: 3,
    icon: <FiLogOut size={20} />,
  },
];

const HeaderIcons = () => {
  return (
    <div>
      {icons.map((icon) => (
        <button className="p-3 rounded-md hover:bg-colorBrand50" key={icon.id}>
          {icon.icon}
        </button>
      ))}
    </div>
  );
};
export default HeaderIcons;
