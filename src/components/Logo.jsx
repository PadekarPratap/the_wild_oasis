import { useThemeProvider } from "../hooks/useThemeProvider";

const Logo = () => {
  const { theme } = useThemeProvider();

  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return <img src={src} alt="logo" className="mx-auto w-40" />;
};
export default Logo;
