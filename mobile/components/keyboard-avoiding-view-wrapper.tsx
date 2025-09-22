import type React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

interface KeyboardAvoidingViewWrapperProps {
  children: React.ReactNode;
  style?: any;
}

export const KeyboardAvoidingViewWrapper: React.FC<
  KeyboardAvoidingViewWrapperProps
> = ({ children, style }) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
