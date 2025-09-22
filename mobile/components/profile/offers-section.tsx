import { OfferCard } from "@/components/profile/offer-card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Offer } from "@/types";
import { FlashList } from "@shopify/flash-list";
import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";

type Props = {
  offers: Offer[];
  sectionTitle?: string;
  loading: boolean;
  editMode?: boolean;
  onAddOffer?: () => void;
  onEditOffer?: (offer: Offer) => void;
  onDeleteOffer?: (offerId: string) => void;
};

export const OffersSection = memo(function OffersSection({
  offers,
  sectionTitle,
  loading,
  editMode = false,
  onAddOffer,
  onEditOffer,
  onDeleteOffer
}: Props) {
  return (
    <View>
      {offers.length === 0 ? (
        <View className="py-6 items-center">
          <Text className="text-sm text-muted-foreground">
            Aucune offre pour le moment. Ajoutez-en une pour l&apos;afficher sur
            votre profil.
          </Text>
          {editMode && (
            <Button
              onPress={onAddOffer}
              variant={"outline"}
              size={"lg"}
              className="mt-4"
            >
              <Text>Ajouter une offre</Text>
            </Button>
          )}
        </View>
      ) : (
        <View>
          <View className="flex-row w-full justify-between items-center mb-3">
            {sectionTitle && (
              <Text className="font-avenirBold text-muted-foreground text-2xl ml-3">
                {sectionTitle}
              </Text>
            )}
            {editMode && (
              <Button onPress={onAddOffer} variant={"outline"} size={"lg"}>
                <Text>Ajouter une offre</Text>
              </Button>
            )}
          </View>

          <FlashList
            data={offers}
            keyExtractor={(it) => String(it.id)}
            renderItem={({ item }) => (
              <OfferCard
                editMode={editMode}
                loading={loading}
                offer={item}
                onPress={() => {
                  if (editMode) {
                    onEditOffer?.(item);
                  }
                }}
                onDelete={() => onDeleteOffer?.(item.id)}
              />
            )}
            ItemSeparatorComponent={() => (
              <Separator className="my-3 h-[2px] bg-gray-300" />
            )}
          />
        </View>
      )}
    </View>
  );
});
