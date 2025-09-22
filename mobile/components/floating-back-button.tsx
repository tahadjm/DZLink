import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";

export const FloatingBackButton = () => {
  const router = useRouter();
  return (
    <View className="absolute top-4 left-4 z-50">
      <Pressable
        onPress={() => router.back()}
        accessibilityLabel="Go back"
        className="bg-white/70 rounded-full p-3 shadow-md"
      >
        <ArrowLeft size={25} color="black" />
      </Pressable>
    </View>
  );
};
