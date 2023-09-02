const Button = ({ children, variant, ...rest }) => {
  const base =
    "rounded duration-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 inline-flex items-center justify-center gap-3";

  const style = {
    primary: `${base} bg-colorBrand500 text-white hover:bg-colorBrand700 disabled:hover:bg-colorBrand500 px-4 py-2 text-lg`,
    "primary-sm": `${base} bg-colorBrand500 text-white hover:bg-colorBrand700 disabled:hover:bg-colorBrand500 px-3 py-1 text`,
    "primary-lg": `${base} bg-colorBrand500 text-white hover:bg-colorBrand700 disabled:hover:bg-colorBrand500 px-5 py-3 text-xl`,
    danger: `${base} bg-red-500 text-red-100 hover:bg-red-700 disabled:hover:bg-red-500 px-4 py-2 text-lg`,
    "danger-sm": `${base} bg-red-500 text-red-100 hover:bg-red-700 disabled:hover:bg-red-500 px-3 py-1 text`,
    "danger-lg": `${base} bg-red-500 text-red-100 hover:bg-red-700 disabled:hover:bg-red-500 px-5 py-3 text-xl`,
    secondary: `${base} bg-white text-gray-500 hover:bg-gray-200 disabled:hover:bg-white border border-gray-300 px-4 py-2 text-lg`,
    "secondary-sm": `${base} bg-white text-gray-500 hover:bg-gray-200 disabled:hover:bg-white border border-gray-300 px-3 py-1 text`,
    "secondary-lg": `${base} bg-white text-gray-500 hover:bg-gray-200 disabled:hover:bg-white border border-gray-300 px-5 py-3 text-xl`,
  };

  return (
    <button {...rest} className={style[variant]}>
      {children}
    </button>
  );
};
export default Button;
