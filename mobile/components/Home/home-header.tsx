import { ListFilter } from "lucide-react-native";
import React, { memo } from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/ui/header-section";
import { Input } from "@/components/ui/input";
import { THEME } from "@/libs/constants";
import { cn } from "@/libs/utils";

type Props = {
  control: any;
  isDimmed: boolean;
  onOpenFilters: () => void;
};

export const HomeHeader = memo(function HomeHeader({
  control,
  isDimmed,
  onOpenFilters,
}: Props) {
  return (
    <View
      className={cn(
        "px-4 pb-3 border-b border-gray-200",
        isDimmed ? "bg-[#0000090] opacity-20" : "bg-background"
      )}
    >
      <HeaderSection
        subtitle="Découvrez les entreprises et les freelances"
        subTitleStyle={{ fontSize: RFValue(14), color: THEME.theme.text }}
        className="mb-2"
      />

      <Input
        iconName="account-search"
        iconPosition="left"
        name="search"
        control={control}
        placeholder="Recherche par nom"
        className="flex-1 rounded-lg"
      >
        <Button
          className="text-white bg-transparent border-border border-2 flex flex-row items-center justify-between gap-3 rounded-2xl"
          onPress={onOpenFilters}
        >
          <Text>Filter</Text>
          <ListFilter size={16} color="black" />
        </Button>
      </Input>
    </View>
  );
});
