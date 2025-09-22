import React, { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "./text";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <View className={`bg-card rounded-3xl border-border border-2 p-3 ${className || ""}`}>
      {children}
    </View>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <View className={`mb-2 ${className || ""}`}>{children}</View>;
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <Text className={`text-lg font-avenirBold text-foreground mb-1 ${className || ""}`}>
      {children}
    </Text>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <Text className={`text-md AvenirMed text-muted-foreground ${className || ""}`}>
      {children}
    </Text>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <View className={`my-1 ${className || ""}`}>{children}</View>;
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <View className={`border-t border-border pt-1 ${className || ""}`}>
      {children}
    </View>
  );
}
