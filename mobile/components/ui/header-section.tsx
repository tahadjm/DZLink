import React from "react";
import { Text, TextStyle, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface HeaderSectionProps {
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  className?: string;
}

export const HeaderSection = ({
  title,
  subtitle,
  titleStyle = { fontSize: RFValue(28) },
  subTitleStyle = { fontSize: RFValue(16) },
  className = "py-6 flex-col gap-4",
}: HeaderSectionProps) => (
  <View className={className}>
    {title && (
      <Text className="font-bold font-avenirBold" style={titleStyle}>
        {title}
      </Text>
    )}
    {subtitle && (
      <Text
        className="font-avenirDefault text-muted-foreground"
        style={subTitleStyle}
      >
        {subtitle}
      </Text>
    )}
  </View>
);
