import { Text } from "@/components/ui/text";
import { sponsorshipService } from "@/services/sponsorshipApi";
import type { SponsorshipPack } from "@/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ConfirmModal } from "../ui/confirm-modal";
import { SheetContainer } from "./sheet-container";
import { SheetHeader } from "./sheet-header";

type Props = {
  sheetRef: React.RefObject<BottomSheet | null>;
  userId: string;
  userCity?: string | null;
  onActivated?: (s: any) => void;
  close: () => void;
  setActiveSheet: (type: "none") => void;
};

export function SponsorshipBottomSheet({
  sheetRef,
  userId,
  userCity,
  onActivated,
  close,
  setActiveSheet,
}: Props) {
  const [packs, setPacks] = useState<SponsorshipPack[]>([]);
  const [selected, setSelected] = useState<SponsorshipPack | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await sponsorshipService.getPacks();
      setPacks(p);
    })();
  }, []);

  const onChoose = useCallback((pack: SponsorshipPack) => {
    setSelected(pack);
    setShowConfirm(true);
  }, []);

  const confirmPay = useCallback(async () => {
    if (!selected) return;
    setProcessing(true);
    try {
      const sponsorship = await sponsorshipService.createSponsorship(
        userId,
        selected.id,
        userCity as string
      );
      if (onActivated) onActivated(sponsorship);
      setShowConfirm(false);
      close();
    } catch (err) {
      console.warn(err);
    } finally {
      setProcessing(false);
    }
  }, [selected, userId, userCity, onActivated, close]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["80%"]}
      onClose={() => setActiveSheet("none")}
    >
      <BottomSheetView
        style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 10 }}
      >
        <SheetHeader title="Promote your profile" onClose={close} />
        <SheetContainer>
          <Text className="text-muted-foreground mb-2">
            Choose a pack to boost your visibility
          </Text>

          <FlatList
            data={packs}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.packCard}>
                <View style={{ flex: 1 }}>
                  <Text className="font-avenirBold text-base">
                    {item.title}
                  </Text>
                  <Text className="text-muted-foreground">
                    {item.durationDays} days · {item.currency} {item.price}
                  </Text>
                  <Text className="text-muted-foreground text-sm mt-1">
                    {item.benefits.join(" · ")}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-primary p-3 rounded-xl "
                  onPress={() => onChoose(item)}
                >
                  <Text className="text-primary-foreground font-avenirBold text-lg">
                    Chose
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text className="text-xs text-muted-foreground mt-4">
            Payments are secure. Admin may validate sponsored listings.
          </Text>
        </SheetContainer>
      </BottomSheetView>

      <ConfirmModal
        visible={showConfirm}
        title="Confirm purchase"
        message={
          <>
            <Text>
              {selected?.title} — {selected?.durationDays} days
            </Text>
            <Text>
              Price: {selected?.currency} {selected?.price}
            </Text>
          </>
        }
        confirmLabel="Confirm & Pay"
        cancelLabel="Cancel"
        processing={processing}
        onConfirm={confirmPay}
        onCancel={() => setShowConfirm(false)}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  packCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
});
