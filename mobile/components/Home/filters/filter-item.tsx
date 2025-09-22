import { TouchableOpacity, View } from "react-native";

import type { FilterLabel } from "@/types";
import { Text } from "@/components/ui/text";

type FilterItemProps = {
  label: FilterLabel;
  count?: number | undefined;
  onPress?: () => void;
};

export function FilterItem({ label, count, onPress }: FilterItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-5 border-b border-neutral-800"
    >
      <Text className="text-black text-base font-semibold">{label}</Text>
      <View className="flex-row items-center gap-4">
        {count ? (
          <View className="bg-primary rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-sm font-semibold">{count}</Text>
          </View>
        ) : null}
        <Text className="text-black">{">"}</Text>
      </View>
    </TouchableOpacity>
  );
}
