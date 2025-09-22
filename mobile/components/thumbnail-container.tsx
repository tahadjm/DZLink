import React, { ReactNode } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type ThumbnailContainerProps = {
  children: ReactNode;
  onPress?: () => void;
  size?: number; // default 64px
  bordered?: boolean;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
} & Omit<ViewProps, "style"> &
  Omit<TouchableOpacityProps, "style">;

export default function ThumbnailContainer({
  children,
  onPress,
  size = 64,
  bordered = false,
  borderColor = "#e5e7eb",
  style,
  ...rest
}: ThumbnailContainerProps) {
  const baseStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: bordered ? 1 : 0,
    borderColor: bordered ? borderColor : "transparent",
  };

  if (onPress) {
    return (
      <TouchableOpacity style={[baseStyle, style]} onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[baseStyle, style]} {...rest}>
      {children}
    </View>
  );
}
