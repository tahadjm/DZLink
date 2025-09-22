import { THEME } from "@/libs/constants";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoadingProps {
  size?: "large" | "small";
  title?: string;
  subtitle?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "small",
  title,
  subtitle = "",
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-background"
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
        }}
        className="bg-background flex-1"
      >
        <ActivityIndicator color={THEME.theme.primary} size={size} />

        {title && (
          <View
            style={{
              flexDirection: "column",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 250,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#000000",
                fontWeight: "600",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {subtitle}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Loading;
