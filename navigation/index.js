// Navigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "../utils/ThemeContext";
import { StackScreens } from "../utils/StackScreens";
import AppHeader from "../components/Appheader";

const Stack = createStackNavigator();

export default function Navigation() {
  const { theme } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator>
        {StackScreens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={({ navigation }) => ({
              headerShown: screen.name === "WelcomeScreen" ? false : true,
              headerTransparent: screen.name === "DetailScreen" ? true : false,
              header: (props) => (
                <AppHeader
                  {...props}
                  screen={screen.name}
                  isDarkMode={theme.mode === "dark"}
                  navigation={navigation}
                />
              ),
            })}
          />
        ))}
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
