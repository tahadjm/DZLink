import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { SheetContainer } from "./sheet-container";
import { SheetHeader } from "./sheet-header";

type Props = {
  sheetRef: React.RefObject<BottomSheet | null>;
  control: any;
  onSubmit: (data: any) => void;
  close: () => void;
  setActiveSheet: (type: "none") => void;
  offerImage?: string;
  pickOfferImage: () => void;
  editingOffer?: any;
};


export function OfferSheet({
  sheetRef,
  control,
  onSubmit,
  close,
  setActiveSheet,
  offerImage,
  pickOfferImage,
}: Props) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["100%"]}
      onClose={() => setActiveSheet("none")}
    >
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <SheetHeader title="Ajouter / Modifier une offre" onClose={close} />

        <SheetContainer>
          {/* Title */}
          <Input
            label="Titre de l'offre"
            name="title"
            control={control}
            className="mb-4"
          />

          {/* Description */}
          <Input
            label="Description"
            name="description"
            control={control}
            multiline
            numberOfLines={4}
            className="mb-6"
          />

          {/* Price */}
          <Input
            label="Prix"
            name="price"
            control={control}
            keyboardType="numeric"
            className="mb-6"
          />

          {/* Image Upload */}
          <View className="mb-6 items-center">
            {offerImage ? (
              <Image
                source={{ uri: offerImage }}
                className="w-32 h-32 rounded-xl mb-3"
              />
            ) : (
              <View className="w-32 h-32 bg-gray-200 rounded-xl items-center justify-center mb-3">
                <Text className="text-gray-500">Pas d’image</Text>
              </View>
            )}

            <Button onPress={pickOfferImage} variant="outline">
              <Text>{offerImage ? "Changer l'image" : "Ajouter une image"}</Text>
            </Button>
          </View>

          {/* Save Button */}
          <Button onPress={onSubmit} className="w-full">
            <Text>Enregistrer</Text>
          </Button>
        </SheetContainer>
      </BottomSheetView>
    </BottomSheet>
  );
}
