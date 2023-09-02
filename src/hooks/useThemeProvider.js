import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useThemeProvider = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeProvider must be used within a ThemeProvider");
  }

  return context;
};
