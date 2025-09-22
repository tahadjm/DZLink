import { mockOffer } from "@/services/__mocks__";
import type { Offer, User } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
export function useProfileForms(user: Partial<User>, userId: string) {
  const { control, handleSubmit, reset } = useForm<Partial<User>>({
    defaultValues: {
      avatarUrl: (user.avatarUrl as string) ?? "",
      name: user.name ?? "",
      bio: user.bio ?? "",
      city: user.city,
      tags: user.tags,
    },
  });

  const {
    control: linkControl,
    handleSubmit: handleLinkSubmit,
    reset: resetLink,
  } = useForm<{ url: string }>({
    defaultValues: { url: "" },
  });

  const {
    control: offerControl,
    handleSubmit: handleOfferSubmit,
    reset: resetOffer,
  } = useForm<{
    title: string;
    description: string;
    price: string;
    currency: string;
  }>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      currency: "DZD",
    },
  });

  // Offers state
  const [offers, setOffers] = useState<Offer[]>(mockOffer);

  return {
    profileForm: { control, handleSubmit, reset },
    linkForm: {
      control: linkControl,
      handleSubmit: handleLinkSubmit,
      reset: resetLink,
    },
    offerForm: {
      control: offerControl,
      handleSubmit: handleOfferSubmit,
      reset: resetOffer,
    },
    offers,
    setOffers,
  };
}
