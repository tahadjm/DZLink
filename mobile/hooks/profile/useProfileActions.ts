import { offerService } from "@/services/offers-service";
import type { Offer, User } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export function useProfileActions({
  user,
  userId,
  reset,
  resetLink,
  resetOffer,
  setOffers,
  setEditingOffer,
  setOfferImage,
  setSelectedAvatar,
  setEditingLink,
  setLinks,
  open,
  closeAll,
}: any) {
  const openProfileSheet = () => {
    reset({ displayName: user.name, bio: user.bio });
    open("profile");
  };

  const openSponsorshipSheet = () => {
    open("sponsorship");
  };

  const openLinkSheet = (label: string, url: string) => {
    setEditingLink({ label, url });
    resetLink({ url });
    open("link");
  };

  const openAvatarSheet = () => {
    reset({ avatarUrl: (user.avatarUrl as string) ?? "" });
    open("avatar");
  };

  const openOfferSheet = (offer?: Offer) => {
    if (offer) {
      // 🔹 Edit existing offer
      setEditingOffer(offer);
      resetOffer({
        title: offer.title,
        description: offer.description ?? "",
        price: offer.price ? String(offer.price) : "",
        currency: offer.currency ?? "DZD",
      });
      setOfferImage(offer.imageUrl);
    } else {
      // 🔹 Add new offer
      setEditingOffer(null);
      resetOffer({ title: "", description: "", price: "", currency: "DZD" });
      setOfferImage(undefined);
    }
    open("offer");
  };

  const onSubmitProfile = (data: Partial<User>) => {
    console.log("Updated profile:", data);
    closeAll();
  };

  const onSubmitOffer = (
    values: any,
    editingOffer: Offer | null,
    offerImage: string | undefined
  ) => {
    const now = new Date().toISOString();
    const priceNum = Number(values.price);

    if (editingOffer) {
      const offer: Partial<Offer> = {
        id: editingOffer.id,
        userId,
        title: values.title,
        description: values.description ?? "",
        price: priceNum,
        currency: values.currency ?? "DZD",
        imageUrl: offerImage ?? editingOffer.imageUrl,
        updatedAt: now,
      };
      offerService.updateOffer(editingOffer.id, offer);
    } else {
      const offer: Partial<Offer> = {
        id: Date.now().toString(),
        userId: userId,
        title: values.title ?? "",
        description: values.description ?? "",
        price: priceNum,
        currency: values.currency ?? "DZD",
        imageUrl: offerImage,
      };
      offerService.addOffer(offer);
    }

    closeAll();
  };

  const confirmDeleteOffer = (offerId: string) => {
    Alert.alert("Delete offer", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await offerService.deleteOffer(offerId);
          console.log("Deleted offer:", offerId);
        },
      },
    ]);
  };

  const pickAvatarImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setSelectedAvatar(localUri);

      try {
        onSubmitProfile({ avatarUrl: result.assets[0].uri });
      } catch (err) {
        console.error("Avatar upload error:", err);
        Alert.alert("Error", "Failed to upload avatar.");
      }
    }
  };

  const pickOfferImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setOfferImage(result.assets[0].uri);
  };

  const onSubmitLink = (
    url: string,
    editingLink: { label: string; url: string } | null
  ) => {
    if (editingLink) {
      setLinks((prev: any) => ({ ...prev, [editingLink.label]: url }));
    }
    closeAll();
  };

  return {
    openProfileSheet,
    openSponsorshipSheet,
    openLinkSheet,
    openAvatarSheet,
    openOfferSheet,
    onSubmitProfile,
    onSubmitOffer,
    confirmDeleteOffer,
    pickAvatarImage,
    pickOfferImage,
    onSubmitLink,
  };
}
