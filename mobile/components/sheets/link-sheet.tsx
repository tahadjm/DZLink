import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect } from "react";
import { Control, Controller, useForm } from "react-hook-form";

import { SheetContainer } from "@/components/sheets/sheet-container";
import { SheetHeader } from "@/components/sheets/sheet-header";
import { Button } from "@/components/ui/button";
import { StyleSheet } from "react-native";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

type LinkForm = {
  url: string;
};

type LinkSheetProps = {
  sheetRef: React.RefObject<BottomSheet | null>;
  label: string;
  initialUrl: string;
  control: Control<LinkForm>;
  onSubmit: (url: string) => void;
  close: () => void;
  setActiveSheet: (
    sheet: "none" | "profile" | "avatar" | "offer" | "link"
  ) => void;
};

export function LinkSheet({
  sheetRef,
  label,
  initialUrl,
  control,
  onSubmit,
  close,
  setActiveSheet,
}: LinkSheetProps) {
  const { reset, handleSubmit } = useForm<LinkForm>({
    defaultValues: { url: initialUrl },
  });

  useEffect(() => {
    reset({ url: initialUrl });
  }, [initialUrl, reset]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={["60%"]}
      enablePanDownToClose
      onClose={() => setActiveSheet("none")}
    >
      <BottomSheetView style={styles.SheetViewStyle}>
        <SheetHeader title={`Modifer le lien de ${label}`} />
        <SheetContainer>
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, value } }) => (
              <Input
                name="url"
                control={control}
                placeholder={`Enter ${label} link`}
                value={value}
                onChangeText={onChange}
                className="mb-4 "
              />
            )}
          />

          <Button
            variant={"outline"}
            size={"xl"}
            onPress={handleSubmit((values) => onSubmit(values.url))}
          >
            <Text>Sauvgarder</Text>
          </Button>
        </SheetContainer>
      </BottomSheetView>
    </BottomSheet>
  );
}


const styles = StyleSheet.create({
  SheetViewStyle: {
    paddingHorizontal: 16,
    flex: 1,
  },
});