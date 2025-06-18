import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WindCompass = ({ speed, direction }) => {
  const rotation = `${direction}deg`;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Wind</Text>
      <Image
        source={require('../assets/images/compass.png')}
        style={[styles.image, { transform: [{ rotate: rotation }] }]}
        resizeMode="contain"
      />
      <Text style={styles.value}>{speed} kph</Text>
      <Text style={styles.description}>{`Direction: ${direction}°`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 12,
    width: '47%',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 6,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  description: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
});

export default WindCompass;
