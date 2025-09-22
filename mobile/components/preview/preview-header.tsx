import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { THEME } from "@/libs/constants";
import { cn } from "@/libs/utils";
import { User } from "@/types";
import React, { memo } from "react";
import { View } from "react-native";
import { Skeleton } from "../skeleton";

type Props = {
  user: User;
  className?: string;
  loading: boolean;
};

export const PreviewHeader = memo(function PreviewHeader({
  user,
  className = "",
  loading = false,
}: Props) {
  if (loading) {
    return (
      <View className="flex-col justify-center items-center gap-2 w-full">
        <Skeleton className="w-28 h-28 rounded-full border-2" />
        <View className="items-center justify-center w-80">
          <Skeleton className="h-4 w-72 mb-2" />
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-6 w-24 mb-3 rounded-md" />
          <Skeleton className="h-4 w-60 mb-3" />
          <View className="flex-row items-start gap-4 flex-wrap py-1">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View
      className={cn("flex-col justify-center items-center gap-2", className)}
    >
      <Avatar
        alt="photo de profile"
        className="w-28 h-28 rounded-full border-2 border-gray-400"
      >
        <AvatarImage
          source={
            typeof user.avatarUrl === "string"
              ? { uri: user.avatarUrl }
              : user.avatarUrl
          }
        />
      </Avatar>
      <View className="flex-col items-center  justify-center w-full">
        <View className="flex-col items-center gap-1">
          <View>
            <Text
              className="text-3xl font-avenirBold text-center
          "
            >
              {user.name}
            </Text>
          </View>
          <View>
            <Badge label={user.role} icon="briefcase" />
          </View>
        </View>

        <View className="w-full">
          <Text className="text-lg text-center font-avenirMed">{user.bio}</Text>
        </View>

        {user.tags?.length > 0 && (
          <View className="flex-row items-start gap-4 flex-wrap py-1">
            {user.tags.map((t: string) => (
              <Badge
                key={t}
                label={t}
                bgColor={THEME.theme.primary}
                textColor={THEME.theme.background}
                className="rounded-md"
                icon="star"
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
});
