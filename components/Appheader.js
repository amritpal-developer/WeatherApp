import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { useTheme } from "../utils/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppHeader = ({ screen, navigation, isDarkMode }) => {
  const { toggleTheme } = useTheme();

  const showBackButton = screen === "DetailScreen";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: showBackButton
            ? "transparent"
            : isDarkMode
            ? "#111"
            : "#fff",
        },
      ]}
    >
      <View style={styles.leftSection}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={"white"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../assets/images/appLogo.png")}
            style={styles.appLogo}
          />
        )}
        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
          {""}
        </Text>
      </View>

      <ThemeToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  appLogo: {
    aspectRatio: 1,
    width: "35%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppHeader;
