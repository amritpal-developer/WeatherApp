import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "../../service/useWeather";
import Icon from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [savedCities, setSavedCities] = useState([]);
  const navigation = useNavigation();
  const { fetchWeather } = useApi();

  const allCities = [
    "Patiala",
    "Sangrur",
    "Niagara Falls",
    "Sudbury",
    "Delhi",
    "Chandigarh",
    "Ludhiana",
    "Toronto",
  ];

  useEffect(() => {
    loadSavedCities();
  }, []);

  const loadSavedCities = async () => {
    const stored = await AsyncStorage.getItem("cities");
    if (stored) {
      const cityArray = JSON.parse(stored);
      const data = await Promise.all(cityArray.map(fetchWeather));
      const validData = data.filter(Boolean);
      setSavedCities(validData);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    const weather = await fetchWeather(search);
    if (weather) {
      const alreadySaved = savedCities.some(
        (c) => c.address.toLowerCase() === weather.address.toLowerCase()
      );
      if (!alreadySaved) {
        const updatedCities = [weather, ...savedCities];
        setSavedCities(updatedCities);
        await AsyncStorage.setItem(
          "cities",
          JSON.stringify(updatedCities.map((c) => c.address))
        );
      }
      setSearch("");
      setSuggestions([]);
    } else {
      alert("City not found or data unavailable.");
    }
  };

  const handleSelect = (city) => {
    setSearch(city);
    setSuggestions([]);
    handleSearch();
  };

  const handleCardPress = (data) => {
    navigation.navigate("DetailScreen", { city: data.address });
  };

  const handleDelete = async (cityName) => {
    const updatedList = savedCities.filter((c) => c.address !== cityName);
    setSavedCities(updatedList);
    await AsyncStorage.setItem(
      "cities",
      JSON.stringify(updatedList.map((c) => c.address))
    );
  };

  useEffect(() => {
    if (search.length > 1) {
      const filtered = allCities.filter((c) =>
        c.toLowerCase().startsWith(search.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>

      <View style={styles.searchBox}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor="#888"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((s, idx) => (
            <TouchableOpacity key={idx} onPress={() => handleSelect(s)}>
              <Text style={styles.suggestion}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView style={styles.cityList}>
        {savedCities.map((city, idx) => {
          const renderRightActions = () => (
            <TouchableOpacity
              style={styles.deleteBox}
              onPress={() => handleDelete(city.address)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          );

          return (
            <Swipeable key={idx} renderRightActions={renderRightActions}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleCardPress(city)}
              >
                <View>
                  <Text style={styles.cityName}>{city?.address}</Text>
                  <Text style={styles.condition}>
                    {city?.currentConditions?.conditions}
                  </Text>
                </View>
                <Text style={styles.temp}>
                  {Math.round(city?.currentConditions?.temp)}°
                </Text>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: { fontSize: 32, color: "#fff", fontWeight: "700", marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 8,
  },
  input: { flex: 1, color: "#fff", paddingLeft: 8 },
  suggestionBox: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  suggestion: { color: "#fff", paddingVertical: 6, paddingHorizontal: 12 },
  cityList: { marginTop: 12 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1c1c1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cityName: { color: "#fff", fontSize: 18, fontWeight: "600" },
  condition: { color: "#ccc" },
  temp: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default HomeScreen;
