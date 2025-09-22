import { ImageSourcePropType } from "react-native";
import type { City, ProfileType, Tag } from "./filters";

export type User = {
  id: string;
  email: string;
  name: string;
  bio: string;
  phone: string;
  website: string;
  city: City["id"];
  profileType: ProfileType;
  tags: Tag["id"][];
  avatarUrl?: ImageSourcePropType | string;
  isSponsored?: boolean;
};
