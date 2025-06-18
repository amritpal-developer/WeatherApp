import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../utils/ThemeContext";
import { BlurView } from "expo-blur";

const InfoCard = ({ iconName, title, value, unit, description }) => {
  const { theme } = useTheme();

  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (iconName === "weather-windy" || iconName === "compass") {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    } else if (
      iconName === "weather-sunny-alert" ||
      iconName === "thermometer"
    ) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [iconName]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle =
    iconName === "weather-windy" || iconName === "compass"
      ? { transform: [{ rotate: spin }] }
      : iconName === "weather-sunny-alert" || iconName === "thermometer"
      ? { transform: [{ scale: pulseAnim }] }
      : {};

  return (
    <BlurView
      intensity={60}
      style={[styles.card]}
      tint={theme.mode === "dark" ? "dark" : "light"}
    >
      <View style={styles.titleRow}>
        <Animated.View style={[styles.iconWrapper, animatedStyle]}>
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={theme?.text}
          />
        </Animated.View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>
      <Text style={[styles.value, { color: theme.text }]}>
        {value}
        {unit}
      </Text>
      <Text style={[styles.description, { color: theme.text }]}>
        {description}
      </Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    width: "47%",
    marginBottom: 12,
    overflow:'hidden'
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconWrapper: {
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
  },
});

export default InfoCard;
