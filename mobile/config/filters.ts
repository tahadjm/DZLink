import type { FilterKey } from "@/types/filters";

export const FILTER_CONFIG: { key: FilterKey; label: string }[] = [
  { key: "city", label: "Ville" },
  { key: "tags", label: "Compétences" },
  { key: "profileType", label: "Type de profil" },
];
