import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeatherOverviewSlide } from "../../components/WeatherOverviewSlide";
import { WeatherForecastSlide } from "../../components/WeatherForecastSlide";
import { WelcomeSlide } from "../../components/WelcomeSlide";
import { PaginationDots } from "../../components/PaginationDots";

const { width: screenWidth } = Dimensions.get("window");

export default function WeatherCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(slide);
  };

  const goToSlide = (slideIndex) => {
    scrollViewRef.current?.scrollTo({
      x: slideIndex * screenWidth,
      animated: true,
    });
  };

  return (
  
    <View style={styles.scrollView}>

    
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.slide}>
          <WeatherOverviewSlide />
        </View>

        <View style={styles.slide}>
          <WeatherForecastSlide />
        </View>

        <View style={styles.slide}>
          <WelcomeSlide onGetStarted={() => goToSlide(0)} />
        </View>
      </ScrollView>

      <PaginationDots
        totalDots={3}
        currentDot={currentSlide}
        onDotPress={goToSlide}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: "row",
  },
  slide: {
    width: "100%",
    flex: 1,
    height: "100%",
  },
});
