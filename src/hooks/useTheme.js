import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const prevTheme = localStorage.getItem("colorTheme");

    if (prevTheme) {
      return prevTheme;
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  });

  useEffect(() => {
    const htmlElem = window.document.documentElement;

    if (theme === "dark") {
      htmlElem.classList.add("dark");
    } else {
      htmlElem.classList.remove("dark");
    }

    localStorage.setItem("colorTheme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return [theme, toggleTheme];
};

export default useTheme;
