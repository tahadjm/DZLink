import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { CTAButton } from "@/components/cta-button";
import { TruncatedText } from "@/components/truncate-text";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { THEME } from "@/libs/constants";
import { openProfilePreview } from "@/libs/navigation";
import { User } from "@/types/";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
type Action = {
  key: string;
  url: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

type Props = {
  profile: User;
};

export default function FeedItem({ profile }: Props) {
  const actions: Action[] = [
    profile.phone && {
      key: "whatsapp",
      url: `https://wa.me/${profile.phone}`,
      icon: <FontAwesome name="whatsapp" size={26} color="#25D366" />,
    },
    profile.phone && {
      key: "call",
      url: `tel:${profile.phone}`,
      icon: <Ionicons name="call-outline" size={26} color="#000" />,
    },
    profile.website && {
      key: "website",
      url: profile.website,
      icon: <MaterialIcons name="language" size={26} color="#000" />,
    },
    {
      key: "more",
      url: "#",
      icon: <AntDesign name="more" size={26} color="black" />,
      highlight: true,
    },
  ].filter(Boolean) as Action[];

  return (
    <TouchableOpacity
      onPress={() => openProfilePreview(profile.id)}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Open profile ${profile.name}`}
    >
      <Card className="px-2 pt-2 pb-4">
        <CardHeader>
          <View className="flex-row gap-2   items-center ">
            <Avatar
              alt="photo de profile"
              className="border-2 border-border w-20 h-20"
            >
              {profile?.avatarUrl ? (
                <AvatarImage
                  source={
                    typeof profile.avatarUrl === "string"
                      ? { uri: profile.avatarUrl }
                      : profile.avatarUrl
                  }
                />
              ) : (
                <AvatarFallback>
                  <Text className="font-avenirMed text-lg text-primary">
                    TD
                  </Text>
                </AvatarFallback>
              )}
            </Avatar>
            <Separator
              orientation="vertical"
              className="h-12 w-[2px] rounded-lg"
            />
            <View className="flex-1 ">
              <CardTitle className="pb-0 mb-0">{profile.name}</CardTitle>
              {profile.city && (
                <CardDescription className="text-muted-foreground pt-0 mt-0">
                  {profile.city}
                </CardDescription>
              )}
              {profile.profileType && (
                <View className="flex-row items-start gap-4 flex-wrap py-1">
                  <Badge
                    key={profile.profileType}
                    label={profile.profileType}
                    bgColor={THEME.theme.primary}
                    textColor={THEME.theme.background}
                    className="rounded-md font-AvenriorBold text-2xl"
                    icon={
                      profile.profileType === "entreprise"
                        ? "briefcase"
                        : "briefcase-outline"
                    }
                  />
                </View>
              )}
            </View>
            {profile.isSponsored && (
              <Badge label="Sponsorisé" icon="megaphone" />
            )}
          </View>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 flex-col">
          {profile.bio && (
            <Text className="text-sm text-foreground ">
              <TruncatedText
                text={profile.bio}
                maxLength={80}
                showMore={false}
              />
            </Text>
          )}

          {profile.tags?.length > 0 && (
            <View className="flex-row items-start gap-4 flex-wrap py-1">
              {profile.tags.map((t) => (
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
        </CardContent>
        <CardFooter className="flex-col gap-3">
          {/* Actions row */}
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-row space-x-4">
              {actions
                .filter((a) => !a.highlight)
                .map((action, index) => (
                  <View
                    key={action.key}
                    className="flex-row items-center justify-center"
                  >
                    <CTAButton
                      key={index}
                      icon={action.icon}
                      url={action.url}
                      highlight={action.highlight}
                    />
                    {index !== actions.length - 2 && (
                      <Separator
                        orientation="vertical"
                        className="h-8 w-[2px] rounded-lg"
                      />
                    )}
                  </View>
                ))}
            </View>

            {/* More button */}
            {actions
              .filter((a) => a.highlight)
              .map((action) => (
                <CTAButton
                  key={action.key}
                  icon={action.icon}
                  url={action.url}
                  highlight={action.highlight}
                />
              ))}
          </View>

          {/* Voir le profil button */}
          <Button
            onPress={() => openProfilePreview(profile.id)}
            variant="default"
            size="xl"
            accessibilityRole="button"
            accessibilityLabel={`View ${profile.name}'s profile`}
          >
            <Text className="text-white font-avenirMed text-xl">
              Voir le profil
            </Text>
          </Button>
        </CardFooter>
      </Card>
    </TouchableOpacity>
  );
}
