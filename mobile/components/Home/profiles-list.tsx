import { FlashList } from "@shopify/flash-list";
import React, { memo } from "react";
import { Text, View } from "react-native";

import { cn } from "@/libs/utils";
import { User } from "@/types";
import FeedItem from "./feed-item";

type Props = {
  data: User[];
  isDimmed: boolean;
};

export const ProfilesList = memo(function ProfilesList({
  data,
  isDimmed,
}: Props) {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => <FeedItem profile={item} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={() => (
        <View className="items-center mt-8">
          <Text className="text-gray-500">Pas de résultats</Text>
        </View>
      )}
      className={cn(isDimmed ? "bg-[#0000090] opacity-20" : "bg-background")}
    />
  );
});
