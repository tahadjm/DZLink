import { FlashList } from "@shopify/flash-list";
import { ArrowLeft, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { FilterItem } from "./filter-item";
import { FilterOptionItem } from "./filter-option-item";

import { FILTER_CONFIG } from "@/config/filters";
import type {
  City,
  FilterKey,
  FiltersState,
  ProfileType,
  Tag,
} from "@/types/filters";

type Props = {
  selected: FiltersState;
  setSelected: React.Dispatch<React.SetStateAction<FiltersState>>;
  onApply?: (selected: FiltersState) => void;
  onClose?: () => void;
  resultCount: number;
  cities: City[]; // <-- passed in from parent
  tags: Tag[]; // <-- passed in from parent
};

type SearchFormValues = {
  filterSearch: string;
};

export const FiltersSection: React.FC<Props> = ({
  selected,
  setSelected,
  onApply,
  onClose,
  resultCount,
  cities,
  tags,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
  const { control, watch, reset } = useForm<SearchFormValues>({
    defaultValues: { filterSearch: "" },
  });

  const query = watch("filterSearch");

  const toggleOption = <K extends FilterKey>(
    key: K,
    option: FiltersState[K][number]
  ) => {
    setSelected((prev) => {
      const current = prev[key] ?? [];
      const already = current.includes(option as never);

      return {
        ...prev,
        [key]: already
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const options = useMemo<FiltersState[FilterKey][number][]>(() => {
    if (!activeFilter) return [];

    switch (activeFilter) {
      case "city":
        return cities.map((c): FiltersState["city"][number] => c.id);

      case "tags":
        return tags.map((t): FiltersState["tags"][number] => t.id);

      case "profileType":
        return ["freelance", "entreprise"] as FiltersState["profileType"];

      default:
        return [];
    }
  }, [activeFilter, cities, tags]);

  const visibleOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? options.filter((o) => String(o).toLowerCase().includes(q))
      : options;
  }, [query, options]);

  const selectedFilter = activeFilter
    ? FILTER_CONFIG.find((f) => f.key === activeFilter)
    : null;

  const resetFilters = () => {
    setSelected({
      city: [],
      tags: [],
      profileType: [],
    });
  };

  return (
    <ScreenContainer className="flex-1 min-h-[400px] mb-20 flex-col justify-between">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200">
        {activeFilter ? (
          <TouchableOpacity
            onPress={() => {
              setActiveFilter(null);
              reset();
            }}
            className="p-2"
          >
            <ArrowLeft color="black" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onClose}>
            <X size={28} color="black" />
          </TouchableOpacity>
        )}
        <Text className="text-black font-semibold text-lg">
          {activeFilter ? selectedFilter?.label : "Filtrer"}
        </Text>
      </View>

      {!activeFilter ? (
        <>
          {FILTER_CONFIG.map((filter) => (
            <FilterItem
              key={filter.key}
              label={filter.label}
              count={selected[filter.key]?.length ?? 0}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </>
      ) : (
        <View className="flex-1">
          <View className="p-4">
            <Input
              control={control}
              name="filterSearch"
              label={`Rechercher dans ${selectedFilter?.label ?? ""}`}
              placeholder={`Ex: ${
                options.length > 0 ? String(options[0]) : ""
              }`}
              placeholderTextColor="#999"
              iconName="magnify"
            />
          </View>

          <FlashList
            data={visibleOptions}
            keyExtractor={(item) => String(item)}
            renderItem={({ item }) => {
              const isSelected = (selected[activeFilter] ?? []).includes(item as ProfileType);
              return (
                <FilterOptionItem
                  activeFilter={activeFilter}
                  item={item}
                  toggleOption={toggleOption}
                  isSelected={isSelected}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 160 }}
          />
        </View>
      )}

      <View className="flex-row items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          className="px-6 py-3 rounded-md"
          onPress={resetFilters}
        >
          <Text className="text-primary text-base">Réinitialiser</Text>
        </Button>
        <Button
          className="px-6 py-3 rounded-md"
          onPress={() => {
            onApply?.(selected);
            onClose?.();
          }}
        >
          <Text className="text-white font-semibold">
            Voir <Text className="font-bold">{resultCount}</Text> profils
          </Text>
        </Button>
      </View>
    </ScreenContainer>
  );
};
