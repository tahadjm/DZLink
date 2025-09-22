import { Link } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <ScreenContainer>
        <Link href={"/(tabs)"}>
          <Text>Logout</Text>
        </Link>
    </ScreenContainer>
  );
}
