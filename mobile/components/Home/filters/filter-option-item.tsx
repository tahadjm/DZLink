import { TouchableOpacity, View } from "react-native";
// eslint-disable-next-line import/no-named-as-default
import Checkbox from "expo-checkbox";

import { THEME } from '@/libs/constants';
import type { FilterKey, FilterOption } from "@/types/filters";
import { Text } from "@/components/ui/text";

interface FilterOptionItemProps<K extends FilterKey> {
  item: FilterOption<K>;
  activeFilter: K;
  toggleOption: (key: K, option: FilterOption<K>) => void;
  isSelected?: boolean;
}

export function FilterOptionItem<K extends FilterKey>({
  item,
  activeFilter,
  toggleOption,
  isSelected = false,
}: FilterOptionItemProps<K>) {
  return (
    <TouchableOpacity onPress={() => toggleOption(activeFilter, item)}>
      <View className="flex-1 flex-row items-center justify-between p-4 border-b border-gray-800">
        <Text className="ml-2 text-black">{String(item)}</Text>
        <Checkbox
          value={isSelected}
          onValueChange={() => toggleOption(activeFilter, item)}
          color={THEME.theme.primary}

        />
      </View>
    </TouchableOpacity>
  );
}
