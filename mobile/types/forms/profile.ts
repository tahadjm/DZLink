import type { City, Tag } from "@/types/filters";
import type { ImageSourcePropType } from "react-native";

export type ProfileFormValues = {
  avatarUrl: string | ImageSourcePropType;
  name: string;
  bio: string;
  city: City["id"];
  tags: Tag["id"][];
};
