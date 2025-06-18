// theme/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const lightTheme = {
  mode: "light",
  background: "white", // Semi-transparent white
  card: "rgba(240, 244, 248, 0.75)",       // Soft blueish white
  text: "#000000",                         // Pure black for strong contrast
  subtext: "#333333",                      // Dark gray subtext
  border: "rgba(0, 0, 0, 0.05)",           // Light border for card separation
  accent: "#007aff",                       // iOS system blue
  tempCold: "#3498db",                     // Blue
  tempHot: "#ff5e57",                      // Warm red-orange
  sunny: "#f1c40f",                        // Yellow
  rainy: "#3498db",                        // Blue
  cloudy: "#7f8c8d",                       // Gray
  special:'white'
};
export const darkTheme = {
  mode: "dark",
  background: "black",     // Semi-transparent deep black
  card: "rgba(28, 28, 30, 0.7)",            // Semi-transparent dark gray
  text: "#ffffff",                          // Pure white text for contrast
  subtext: "#b0b0b0",                       // Lighter gray for secondary info
  border: "rgba(255, 255, 255, 0.1)",       // Soft translucent white border
  accent: "#0A84FF",                        // iOS system blue (dark mode)
  tempCold: "#5dade2",                      // Cool blue
  tempHot: "#ff6b6b",                       // Soft warm red
  sunny: "#ffd60a",                         // Warm yellow
  rainy: "#4aa3df",                         // Sky blue
  cloudy: "#636e72",    
  special:'white'                    // Muted gray
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
