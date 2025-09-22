import type { FiltersState, User } from "@/types";
import React from "react";

export function useProfilesFilter(
  data: User[] | null,
  query: string,
  selected: FiltersState
): User[] {
  return React.useMemo(() => {
    if (!data) return [];

    const q = (query ?? "").trim().toLowerCase();

    return data.filter((u) => {
      const matchesSearch = !q || u.name.includes(q);

      const matchesCity =
        selected.city.length === 0 || selected.city.includes(u.city ?? "");

      const matchesTags =
        selected.tags.length === 0 ||
        (u.tags ?? []).some((tag) => selected.tags.includes(tag));

      const matchesProfileType =
        selected.profileType.length === 0 ||
        selected.profileType.includes(u.profileType ?? "");

      return matchesSearch && matchesCity && matchesTags && matchesProfileType;
    });
  }, [data, query, selected]);
}
