import type { CitiesResponse, TagsResponse } from "@/types/api";

export const mockCities: CitiesResponse = [
  { id: "alger", name: "Alger" },
  { id: "oran", name: "Oran" },
  { id: "constantine", name: "Constantine" },
  { id: "setif", name: "Sétif" },
  { id: "bejaia", name: "Béjaïa" },
];

export const mockTags: TagsResponse = [
  { id: "design", name: "Design" },
  { id: "dev", name: "Développement" },
  { id: "photo", name: "Photographie" },
  { id: "marketing", name: "Marketing" },
  { id: "seo", name: "SEO" },
];
