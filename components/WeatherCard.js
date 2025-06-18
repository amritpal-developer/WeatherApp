import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";// ⬅️ Import useTheme
import { useTheme } from "../utils/ThemeContext";

const iconMap = {
  rain: require("../assets/animations/rain.json"),
  snow: require("../assets/animations/snow.json"),
  clear: require("../assets/animations/clear.json"),
  cloudy: require("../assets/animations/cloud.json"),
  fog: require("../assets/animations/cloud.json"),
  thunder: require("../assets/animations/thunder.json"),
};

const WeatherCard = ({ data, minTempGlobal, maxTempGlobal }) => {
  const { theme } = useTheme(); 

  if (!data) return null;

  const { datetime, tempmax, tempmin, icon, precipprob } = data;
  const lottieIcon = iconMap[icon?.toLowerCase()] || iconMap.clear;

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
      return "Today";

    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  };

  const progressLeft =
    ((tempmin - minTempGlobal) / (maxTempGlobal - minTempGlobal)) * 100;
  const progressRight =
    ((tempmax - minTempGlobal) / (maxTempGlobal - minTempGlobal)) * 100;

  return (
    <View
      style={[
        styles.card,
   
      ]}
    >
      <Text style={[styles.day, { color: theme.text }]}>
        {formatDay(datetime)}
      </Text>

      <View style={styles.iconWithPercentage}>
        <View style={styles.iconContainer}>
          <LottieView source={lottieIcon} autoPlay loop style={styles.lottie} />
        </View>
        {precipprob ? (
          <Text style={[styles.precip, { color: theme.accent }]}>
            {Math.round(precipprob)}%
          </Text>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      <Text style={[styles.tempText, { color: theme.text }]}>
        {Math.round(tempmin)}°
      </Text>

      <View style={styles.barContainer}>
        <View
          style={[styles.barBackground, { backgroundColor: theme.border }]}
        />
        <LinearGradient
          colors={["#ffa726", "#ff7043"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.barForeground,
            {
              left: `${progressLeft}%`,
              width: `${progressRight - progressLeft}%`,
            },
          ]}
        />
      </View>

      <Text style={[styles.tempText, { color: theme.text }]}>
        {Math.round(tempmax)}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderTopWidth: 0.3,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconWithPercentage: {
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 16,
    width: 60,
    fontWeight: "600",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 32,
    height: 32,
  },
  precip: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
  },
  tempText: {
    fontSize: 16,
    fontWeight: "500",
    width: 40,
    textAlign: "center",
  },
  barContainer: {
    flex: 1,
    height: 6,
    marginHorizontal: 8,
    justifyContent: "center",
  },
  barBackground: {
    height: 6,
    borderRadius: 3,
    width: "100%",
    position: "absolute",
  },
  barForeground: {
    height: 6,
    borderRadius: 3,
    position: "absolute",
  },
});

export default WeatherCard;
