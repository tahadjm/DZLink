export interface City {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export type ProfileType = "freelance" | "entreprise";

export type FilterKey = "city" | "tags" | "profileType";

export interface FiltersMap {
  city: City["id"];
  tags: Tag["id"];
  profileType: ProfileType;
}

export type FiltersState = {
  [K in keyof FiltersMap]: FiltersMap[K][];
};
