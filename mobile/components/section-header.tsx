import { cn } from "@/libs/utils";
import React from "react";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleSize?: string;
  subtitleSize?: string;
  className?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  titleSize = "text-2xl",
  subtitleSize = "text-lg",
  className = "py-6 flex-col gap-4",
}: SectionHeaderProps) => (
  <View className={className}>
    <Text className={cn("font-bold font-avenirBold", titleSize)}>{title}</Text>
    {subtitle && (
      <Text
        className={cn("font-avenirDefault text-muted-foreground", subtitleSize)}
      >
        {subtitle}
      </Text>
    )}
  </View>
);
