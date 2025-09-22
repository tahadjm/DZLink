import { openLink } from "@/libs/utils";
import React from "react";
import { TouchableOpacity } from "react-native";

type CTAButtonProps = {
  icon: React.ReactNode;
  url: string;
  highlight?: boolean; // for special styling like "more" button
};

export function CTAButton({ icon, url, highlight }: CTAButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => openLink(url)}
      className={`h-8 w-12 rounded-full items-center justify-center ${
        highlight ? "rounded-lg h-12 w-8" : ""
      }`}
      accessibilityRole="button"
      accessibilityLabel="Action button"
    >
      {icon}
    </TouchableOpacity>
  );
}
