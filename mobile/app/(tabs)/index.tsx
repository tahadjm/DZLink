import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { FiltersBottomSheet } from "@/components/Home/filters-bottom-sheet";
import { HomeHeader } from "@/components/Home/home-header";
import { ProfilesList } from "@/components/Home/profiles-list";
import { OverlayDim } from "@/components/overlay";
import { ScreenContainer } from "@/components/screen-container";

import { useProfilesFilter } from "@/hooks/profile";
import { useDebounce } from "@/hooks/useDebounce";
import { filtersService } from "@/services/filters-service";
import { userService } from "@/services/user-service";
import type { City, FiltersState, Tag, User } from "@/types";

type SearchFormValues = { search: string };

export default function HomeFeed() {
  const sheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<FiltersState>({
    city: [],
    tags: [],
    profileType: [],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, citiesData, tagsData] = await Promise.all([
        userService.getAllusers(),
        filtersService.getCities(),
        filtersService.getTags(),
      ]);
      setUsers(
        usersData.map((u) => ({
          ...u,
          _searchName: u.name.toLowerCase().trim(),
        }))
      );
      setCities(citiesData ?? []);
      setTags(tagsData ?? []);
    };
    fetchData();
  }, []);

  const { control, watch } = useForm<SearchFormValues>({
    defaultValues: { search: "" },
  });
  const query = watch("search");

  const debouncedQuery = useDebounce(query, 300);
  console.log("HOMEFEEDSCREE: debouncedQuery", debouncedQuery);

  const filtered = useProfilesFilter(users, debouncedQuery, selected);

  const handleOpenFilters = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
    setIsOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <ScreenContainer className="flex-1 flex-col justify-around mb-20">
        <HomeHeader
          control={control}
          isDimmed={isOpen}
          onOpenFilters={handleOpenFilters}
        />

        <ProfilesList data={filtered} isDimmed={isOpen} />

        <OverlayDim visible={isOpen} onClose={handleCloseSheet} />
      </ScreenContainer>

      <FiltersBottomSheet
        ref={sheetRef}
        onClose={handleCloseSheet}
        resultCount={filtered.length}
        selected={selected}
        setSelected={setSelected}
        cities={cities}
        tags={tags}
      />
    </View>
  );
}
