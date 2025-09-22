import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Text } from "@/components/ui/text";
import { openProfilePreview } from "@/libs/navigation";
import { cn } from "@/libs/utils";
import { User } from "@/types";

type Props = {
  disabled?: boolean;
  label?: string;
  profile: User;
};

export default function PreviewFloatingButton({
  disabled,
  label,
  profile,
}: Props) {
  return (
    <View className="absolute bottom-6 right-6 z-50" pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => {
          openProfilePreview(profile.id);
        }}
        disabled={disabled}
        activeOpacity={0.85}
        className={cn(
          "rounded-full px-4 py-3 shadow-lg",
          disabled
            ? "opacity-50 cursor-not-allowed bg-muted-foreground"
            : "bg-background"
        )}
      >
        {label ? (
          <Text className={`text-sm font-medium text-muted-foreground}`}>
            {label}
          </Text>
        ) : (
          <Ionicons name="eye-outline" size={22} color={"black"} />
        )}
      </TouchableOpacity>
    </View>
  );
}
