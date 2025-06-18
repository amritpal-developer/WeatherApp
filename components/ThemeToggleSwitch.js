import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Easing } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

const ThemeToggleSwitch = ({ isDarkMode, toggleTheme, size = 40 }) => {
  const animation = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDarkMode ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [isDarkMode]);

  const width = size * 2.4;
  const height = size;
  const borderRadius = height / 2;
  const thumbSize = size * 0.65;

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, width - thumbSize - 4],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#87CEFA", "#1c1c1e"], // Light blue → Dark
  });

  return (
    <Pressable onPress={toggleTheme}>
      <Animated.View
        style={[
          styles.switchContainer,
          {
            width,
            height,
            borderRadius,
            backgroundColor,
            padding: 2,
          },
        ]}
      >
        {/* Sky / Night Background Icons */}
        <Svg
          width={width}
          height={height}
          style={{ position: "absolute", borderRadius }}
        >
          {!isDarkMode ? (
            // Day Mode
            <>
              <Circle cx={height / 2} cy={height / 2} r={height * 0.35} fill="#FFD700" />
              <Rect
                x={width * 0.6}
                y={height * 0.3}
                rx={10}
                ry={10}
                width={height * 0.6}
                height={height * 0.4}
                fill="#fff"
                opacity={0.3}
              />
            </>
          ) : (
            // Night Mode
            <>
              <Circle cx={width * 0.75} cy={height / 2} r={height * 0.3} fill="#dcdcdc" />
              <Circle cx={width * 0.2} cy={height * 0.3} r={2} fill="#fff" />
              <Circle cx={width * 0.25} cy={height * 0.7} r={1.5} fill="#fff" />
              <Circle cx={width * 0.4} cy={height * 0.4} r={1.2} fill="#fff" />
            </>
          )}
        </Svg>

        {/* Thumb */}
        <Animated.View
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: "#fff",
            transform: [{ translateX }],
            position: "absolute",
            top: (height - thumbSize) / 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 4,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default ThemeToggleSwitch;
