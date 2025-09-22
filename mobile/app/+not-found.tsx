import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-2xl">This screen does not exist.</Text>
        <Link href="/" className="mt-15 px-15 underline text-blue-500 text-xl">
          <Text >Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}