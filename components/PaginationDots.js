import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function PaginationDots({ totalDots, currentDot, onDotPress }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentDot
                  ? 'rgba(255, 255, 255, 0.95)' // active dot: bright
                  : 'rgba(255, 255, 255, 0.3)',  // inactive: semi-transparent
              transform: [{ scale: index === currentDot ? 1.3 : 1 }],
            },
          ]}
          onPress={() => onDotPress(index)}
          activeOpacity={0.8}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // float it above background
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});
