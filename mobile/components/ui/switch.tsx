import * as React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  disabled?: boolean;
};

export function Switch({ checked, onCheckedChange, disabled }: SwitchProps) {
  const animatedValue = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, checked]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // knob movement
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#d1d5db", "#047857"], // gray-300 -> green-700
  });

  return (
    <TouchableOpacity
      onPress={() => !disabled && onCheckedChange(!checked)}
      style={styles.container}
    >
      <Animated.View style={[styles.track, { backgroundColor }]} />
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    width: "100%",
    height: 28,
    borderRadius: 14,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 2,
  },
});
