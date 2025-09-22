import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { THEME } from "@/libs/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { EditIcon } from "lucide-react-native";
import { View } from "react-native";
import { SheetContainer } from "./sheet-container";
import { SheetHeader } from "./sheet-header";

type Props = {
  sheetRef: React.RefObject<BottomSheet | null>;
  selectedAvatar?: string;
  pickAvatar: () => void;
  close: () => void;
  setActiveSheet: (type: "none") => void;
};

export function AvatarSheet({
  sheetRef,
  selectedAvatar,
  pickAvatar,
  close,
  setActiveSheet,
}: Props) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["45%"]}
      onClose={() => setActiveSheet("none")}
    >
      <BottomSheetView
        style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 8 }}
      >
        <SheetHeader title="Photo de profil" onClose={close} />
        <SheetContainer>
          <View className="items-center justify-center ">
            <Avatar
              alt="profile"
              className="w-28 h-28 rounded-full border-2 border-gray-400"
            >
              <AvatarImage
                source={
                  selectedAvatar
                    ? { uri: selectedAvatar }
                    : require("@/assets/thumbnails/profile-1.jpg")
                }
              />
            </Avatar>
          </View>
          <Button
            onPress={pickAvatar}
            className="flex-row gap-2 "
            size="xl"
            variant={"outline"}
          >
            <Text className="font-avenirBold">Modifier</Text>
            <EditIcon size={24} color={THEME.mutedForeground} />
          </Button>
        </SheetContainer>
      </BottomSheetView>
    </BottomSheet>
  );
}
