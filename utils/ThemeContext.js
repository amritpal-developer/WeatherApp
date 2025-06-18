// theme/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const lightTheme = {
  mode: "light",
  background: "#f0f4f8",
  card: "#ffffff",
  text: "#1a1a1a",
  subtext: "#4a4a4a",
  border: "#d6d6d6",
  accent: "#007aff", // iOS blue
  tempCold: "#74b9ff",
  tempHot: "#ff7675",
  sunny: "#f1c40f",
  rainy: "#3498db",
  cloudy: "#95a5a6",
};

export const darkTheme = {
  mode: "dark",
  background: "#0a0a0a",
  card: "#1c1c1e",
  text: "#ffffff",
  subtext: "#cccccc",
  border: "#333333",
  accent: "#0af", // bright blue
  tempCold: "#74b9ff",
  tempHot: "#ff7675",
  sunny: "#f1c40f",
  rainy: "#2980b9",
  cloudy: "#7f8c8d",
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });
    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === "dark" ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
