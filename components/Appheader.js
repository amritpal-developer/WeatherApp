// AppHeader.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { useTheme } from "../utils/ThemeContext";

const AppHeader = ({ screen, navigation, isDarkMode }) => {
    const { theme, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: "#111" }]}>
      <Text style={styles.title}>{screen}</Text>
      <ThemeToggleSwitch
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // ✅ Header height here
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#fff", // or dynamic from theme
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppHeader;
