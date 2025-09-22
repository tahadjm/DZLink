import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { THEME } from "@/libs/constants";
import "../global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: THEME.theme.background }}
    >
      <MenuProvider>
        <View
          className="flex-1"
          style={{
            paddingTop: insets.top,
            paddingRight: insets.right,
            paddingLeft: insets.left,
          }}
        >
          <StatusBar backgroundColor="white" />
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: THEME.theme.background,
              },
              headerTintColor: THEME.theme.background,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile/preview"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </View>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}
