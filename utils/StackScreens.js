import HomeScreen from "../app/screens/HomeScreen";
import DetailScreen from "../app/screens/DetailScreen";
import WeatherCarousel from "../app/screens/WelcomeScreen";

export const StackScreens = [
  { name: "WelcomeScreen", component: WeatherCarousel },
  { name: "HomeScreen", component: HomeScreen },
  { name: "DetailScreen", component: DetailScreen },
];
