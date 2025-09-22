import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import HeaderLeft from "@/components/layout/header-left";
import HeaderRight from "@/components/layout/header-Right";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { THEME } from "@/libs/constants";

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthenticated(true);
    };
    checkAuth();
  }, []);

  const CustomHeader = () => (
    <View
      style={{
        height: 70,
        backgroundColor: THEME.theme.background,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
      }}
    >
      <HeaderLeft />
      <HeaderRight isAuthenticated={isAuthenticated} />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.theme.primary,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="account.circle" color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />
    </Tabs>
  );
}
