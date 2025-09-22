import { router } from "expo-router";

export const openProfilePreview = (profileId: string) => {
  router.push({
    pathname: "/profile/preview",
    params: { id: profileId },
  });
};
