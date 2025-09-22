import React, { memo, useCallback } from "react";
import { View } from "react-native";

import { SocialLinkCard } from "@/components/profile/user-link-cards";
import { openLink } from "@/libs/utils";
import { Text } from "../ui/text";

type Props = {
  links: Record<string, string>;
  onEditLink?: (label: string, url: string) => void;
  editMode?: boolean;
  loading: boolean;
};

export const LinksList = memo(function LinksList({
  links,
  editMode = false,
  onEditLink,
  loading,
}: Props) {
  const handlePress = useCallback((url: string) => openLink(url), []);

  return (
    <View className="flex-1 flex-col gap-3">
      <Text className="font-avenirBold text-muted-foreground text-2xl ml-3 ">
        Mes Liens
      </Text>
      {Object.entries(links).map(([label, url]) => (
        <SocialLinkCard
          key={label}
          label={label}
          url={url}
          onEdit={() => onEditLink?.(label, url)}
          onPress={() => handlePress(url)}
          editMode={editMode}
          loading={loading}
        />
      ))}
    </View>
  );
});
