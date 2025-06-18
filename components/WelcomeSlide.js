import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function WelcomeSlide({ onGetStarted }) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.7)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(0, 0, 0, 0.8)",
        ]}
        style={styles.overlay}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appName}>WEATHER</Text>
            <Text style={styles.appName}>FLOW</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              We're here to keep you updated on the weather, so you can plan
              your day without surprises
            </Text>
          </View>

          {/* Get Started Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={()=>navigation.navigate("HomeScreen")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 60,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 20,
    color: "#ffffff",
    opacity: 0.8,
    marginBottom: 20,
    textAlign: "center",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 2,
    textAlign: "center",
    lineHeight: 50,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 300,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  getStartedButton: {
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: "transparent",
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 1,
  },
});
