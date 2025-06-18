import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoCard = ({ iconName, title, value, unit, description }) => {
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

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Animated.View
          style={[
            styles.iconWrapper,
            (iconName === "weather-windy" || iconName === "compass") && {
              transform: [{ rotate: spin }],
            },
            (iconName === "weather-sunny-alert" ||
              iconName === "thermometer") && {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <MaterialCommunityIcons name={iconName} size={20} color="#fff" />
        </Animated.View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>
        {value}
        {unit}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2c2c2e",
    borderRadius: 12,
    padding: 12,
    width: "47%",
    marginBottom: 12,
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
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default InfoCard;
