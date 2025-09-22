// components/TruncatedText.tsx
import { truncateText } from "@/libs/utils";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TruncatedTextProps = {
  text: string;
  maxLength?: number;
  showMore?: boolean;
};

export function TruncatedText({
  text,
  maxLength = 100,
  showMore = true,
}: TruncatedTextProps) {
const [expanded, setExpanded] = useState(text.length <= maxLength);
  console.log("expanded", expanded);

  if (!text) return null;

  const isLong = text.length > maxLength;

  const truncated = truncateText(text, maxLength, "");
  const displayText = expanded || !isLong ? text : truncated;

  return (
    <View>
      <Text className="text-sm text-foreground flex-row flex-wrap ">
        {displayText}
        {!expanded && isLong && (
          <Text className="text-lg font-bold text-foreground">…</Text>
        )}
      </Text>

      {isLong && showMore && (
        <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
          <Text className="text-sm text-foreground flex-row flex-wrap ">
            {displayText}
            {!expanded && isLong && "…"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
