import React, { ReactNode } from "react";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingViewWrapper } from "./keyboard-avoiding-view-wrapper";

interface ScreenContainerProps {
  children: ReactNode;
  scrollViewProps?: ScrollViewProps;
  innerViewProps?: ViewProps;
  className?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollViewProps,
  innerViewProps,
  className = "flex flex-1 flex-col p-8 gap-4 bg-background",
}) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingViewWrapper >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        <View
          style={{
            paddingRight: insets.right,
            paddingBottom: 30,
            paddingLeft: insets.left,
          }}
          {...innerViewProps}
        >
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingViewWrapper>
  );
};
