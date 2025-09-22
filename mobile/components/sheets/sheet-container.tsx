import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface SheetContainerProps {
  children: ReactNode;
}

export const SheetContainer = ({ children }: SheetContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 16,
    minHeight: 200,
},
});