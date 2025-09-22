/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { SheetContainer } from "./sheet-container";
import { SheetHeader } from "./sheet-header";

import type { City, Tag } from "@/types/filters";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
  sheetRef: React.RefObject<BottomSheet | null>;
  control: any;
  onSubmit: (data: any) => void;
  close: () => void;
  setActiveSheet: (type: "none") => void;
  cities: City[];
  tags: Tag[];
};

export function ProfileSheet({
  sheetRef,
  control,
  onSubmit,
  close,
  setActiveSheet,
  cities,
  tags,
}: Props) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["100%"]}
      enablePanDownToClose
      onClose={() => setActiveSheet("none")}
    >
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <SheetHeader title="Edit Profile" onClose={close} />

        <SheetContainer>
          <Input
            label="Display name"
            name="displayName"
            control={control}
            className="mb-4"
          />

          <Input
            label="Bio"
            name="bio"
            control={control}
            multiline
            numberOfLines={4}
            className="mb-6"
          />

          {/* City Autocomplete */}
          <Controller
            control={control}
            name="city"
            render={({ field: { value, onChange } }) => {
              const [query, setQuery] = useState(value || "");
              const [showSuggestions, setShowSuggestions] = useState(false);

              const filtered = cities.filter((c) =>
                c.name.toLowerCase().includes(query.toLowerCase())
              );

              return (
                <View className="mb-6">
                  <Input
                    label="City"
                    value={query}
                    onChangeText={(text: string) => {
                      setQuery(text);
                      setShowSuggestions(true);
                      onChange(text);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 150)
                    }
                    control={control}
                    name="city"
                  />

                  {showSuggestions && filtered.length > 0 && (
                    <View className="border rounded-lg bg-white mt-1 max-h-40">
                      {filtered.map((c) => (
                        <Text
                          key={c.id}
                          className="p-2 text-sm border-b border-gray-100"
                          onPress={() => {
                            setQuery(c.name);
                            onChange(c.name);
                            setShowSuggestions(false);
                          }}
                        >
                          {c.name}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            }}
          />
          <ScrollView>
            <Controller
              control={control}
              name="tags"
              render={({ field: { value = [], onChange } }) => (
                <View className="mb-8">
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: "500",
                      color: "#555555",
                      marginBottom: RFValue(6),
                    }}
                  >
                    Tags
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {tags.map((t) => {
                      const isSelected = value.includes(t.id);
                      return (
                        <Button
                          key={t.id}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="rounded-full px-4"
                          onPress={() =>
                            onChange(
                              isSelected
                                ? value.filter((id: string) => id !== t.id)
                                : [...value, t.id]
                            )
                          }
                        >
                          <Text
                            className={
                              isSelected
                                ? "text-white"
                                : "text-muted-foreground"
                            }
                          >
                            {t.name}
                          </Text>
                        </Button>
                      );
                    })}
                  </View>
                </View>
              )}
            />
          </ScrollView>

          <Button
            onPress={onSubmit}
            variant="default"
            size="xl"
            className="w-full mb-8"
          >
            <Text className="text-lg font-avenirBold text-white">Save</Text>
          </Button>
        </SheetContainer>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
