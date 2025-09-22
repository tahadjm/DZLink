import { Link, router } from "expo-router";
import { LogOut, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ImageSourcePropType, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

import { userService } from "@/services/user-service";
import { User as UserType } from "@/types";

export default function HeaderRight({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUser = async () => {
      try {
        const me = await userService.getMe();
        setUser(me);
      } catch (e) {
        console.error("Failed to fetch user", e);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    // TODO: clears token from SecureStore
  };

  if (!isAuthenticated) {
    return (
      <Button>
        <Link href="/">
          <Text>Se connecter</Text>
        </Link>
      </Button>
    );
  }

  return (
    <Menu>
      <MenuTrigger>
        <Avatar alt="Avatar" className="w-12 h-12 rounded-full bg-black">
          {user?.avatarUrl ? (
            <AvatarImage source={user.avatarUrl as ImageSourcePropType} />
          ) : (
            <AvatarFallback>
              <Text className="font-avenirMed text-lg text-primary">TD</Text>
            </AvatarFallback>
          )}
        </Avatar>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginTop: 55,
            paddingVertical: 8,
            borderRadius: 12,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
            minWidth: 150,
          },
        }}
      >
        <MenuOption
          onSelect={() => router.push("/(tabs)/profile")}
          customStyles={{
            optionWrapper: {
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
            },
          }}
        >
          <User size={20} color="#374151" style={{ marginRight: 12 }} />
          <Text className="text-base text-gray-800">Profile</Text>
        </MenuOption>

        <View className="h-[1px] bg-gray-200 mx-2 my-1" />

        <MenuOption
          onSelect={handleLogout}
          customStyles={{
            optionWrapper: {
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
            },
          }}
        >
          <LogOut size={20} color="#DC2626" style={{ marginRight: 12 }} />
          <Text className="text-base text-red-600">Logout</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
