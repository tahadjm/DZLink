import { THEME } from "@/libs/constants";
import { cn } from "@/libs/utils";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type BadgeProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

export function Badge({
  label,
  icon ,

  textColor = THEME.secondaryBackground,
  bgColor = "#FEF3C7",
  className = "",
}: BadgeProps) {
  return (
    <View
      className={cn("flex-row items-center px-3 py-1 rounded-full ",className)}
      style={{ backgroundColor: bgColor }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={12}
          color={textColor}
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        className="font-semibold tracking-wide uppercase"
        style={{ fontSize: 11, color: textColor }}
      >
        {label}
      </Text>
    </View>
  );
}
