import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Skeleton } from "../skeleton";

import { THEME } from "@/libs/constants";
import { cn, truncateText } from "@/libs/utils";
import { User } from "@/types";

type Props = {
  user: User;
  selectedAvatar?: string;
  onOpenAvatar?: () => void;
  onOpenProfile?: () => void;
  avatarPlaceholder?: any;
  className?: string;
  loading: boolean;
};

export const ProfileHeader = memo(function ProfileHeader({
  user,
  selectedAvatar,
  onOpenAvatar,
  onOpenProfile,
  avatarPlaceholder,
  className = "",
  loading,
}: Props) {
  if (loading) {
    return (
      <View className="flex-row items-center gap-2">
        <Skeleton className="w-28 h-28 rounded-full border-2" />
        <View className="items-start justify-center w-80">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-6 w-24 mb-3 rounded-md" />
          <Skeleton className="h-4 w-72 mb-2" />
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
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      className={cn("flex-row items-center gap-2", className)}
    >
      <TouchableOpacity onPress={onOpenAvatar}>
        <Avatar
          alt="photo de profile"
          className="w-28 h-28 rounded-full border-2 border-gray-400"
        >
          {user.avatarUrl ? (
            <AvatarImage
              source={
                typeof user.avatarUrl === "string"
                  ? { uri: user.avatarUrl }
                  : user.avatarUrl
              }
            />
          ) : (
          <AvatarFallback  className="justify-center items-center h-full w-full">
          </AvatarFallback>
          )}
        </Avatar>
      </TouchableOpacity>

      <Separator orientation="vertical" className="w-[3px] h-30 rounded-lg" />

      <View className="items-start justify-center w-full">
        <TouchableOpacity onPress={onOpenProfile} className="flex-row gap-2">
          <View>

          <Text className="text-lg font-avenirBold">{user.name}</Text>
          <Badge label={user.profileType} icon="briefcase" />
          </View>
          <View>
            <Text className="text-lg font-avenirMed text-muted-foreground uppercase">{user.city}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpenProfile}>
          {!user.bio ? (
            <Text className="text-sm text-muted-foreground">
              {truncateText(user.bio, 95, "...")}
            </Text>
          ): (
            <Text className="text-sm text-muted-foreground py-1 ">
              Il n&apos;y a pas encore de biographie.
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpenProfile}>
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
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});
