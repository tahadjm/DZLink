import { FILTERS } from "@/services/__mocks__";
import { FilterKey, FilterOption } from "@/types";

export function getOptions<K extends FilterKey>(key: K): FilterOption<K>[] {
  const filter = FILTERS.find((f) => f.key === key);
  return (filter?.options ?? []) as FilterOption<K>[];
}
