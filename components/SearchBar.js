// /components/SearchBar.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

const citySuggestions = [
  "Patiala",
  "Sangrur",
  "Niagara Falls",
  "Sudbury",
  "Delhi",
  "Chandigarh",
];

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = citySuggestions.filter((c) =>
    c.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <View style={{ margin: 16 }}>
      <TextInput
        placeholder="Search for a city"
        style={{ backgroundColor: "#eee", padding: 12, borderRadius: 10 }}
        value={query}
        onChangeText={setQuery}
      />
      {query.length > 0 && (
        <FlatList
          data={filtered}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                setQuery("");
              }}
            >
              <Text style={{ padding: 10 }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
}
