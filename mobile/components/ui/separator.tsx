import { View } from "react-native";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  height?:string;
};

export function Separator({
  orientation = "horizontal",
  className = "",
  height = "full"
}: SeparatorProps) {
  return (
    <View
      className={`
        bg-border
        ${orientation === "horizontal" ? "h-[1px] w-full" : `w-[1px] ${height} `}
        ${className ?? ""}
      `}
    />
  );
}
