import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  containerSuccess: {
    backgroundColor: "#D1FADF",
    height: 60,
    width: "auto",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center",
    marginTop: 20,
  },
  containerError: {
    backgroundColor: "#FEE4E2",
    height: 60,
    width: "auto",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center",
    marginTop: 20,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  text2: {
    fontSize: 14,
    textAlign: "center",
  },
});

export const toastConfig = {
  success: ({ text2 }: any) => (
    <View style={styles.containerSuccess} className="m-20">
      <Text style={[styles.text1, { color: "#027A48" }]}>Success</Text>
      <Text style={[styles.text2, { color: "#027A48" }]}>{text2}</Text>
    </View>
  ),
  error: ({ text2 }: any) => (
    <View style={styles.containerError}>
      <Text style={[styles.text1, { color: "#B42318" }]}>Error</Text>
      <Text style={[styles.text2, { color: "#B42318" }]}>{text2}</Text>
    </View>
  ),
};
