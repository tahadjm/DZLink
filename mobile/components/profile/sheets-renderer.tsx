import React from "react";

import { AvatarSheet } from "@/components/sheets/avatar-sheet";
import { LinkSheet } from "@/components/sheets/link-sheet";
import { OfferSheet } from "@/components/sheets/offer-sheet";
import { ProfileSheet } from "@/components/sheets/profile-sheet";
import { SponsorshipBottomSheet } from "@/components/sheets/sponsorship-bottom-sheet";

import type { City, Tag } from "@/types/filters";

type SheetName =
  | "none"
  | "profile"
  | "avatar"
  | "offer"
  | "link"
  | "sponsorship";

type Props = {
  refs: any;
  control: any;
  offerControl: any;
  linkControl: any;
  editingOffer: any;
  editingLink: any;
  offerImage?: string | undefined;
  pickOfferImage: () => void;
  pickAvatarImage: () => void;
  onSubmitProfile: any;
  onSubmitOffer: any;
  onSubmitLink: any;
  closeAll: () => void;
  setActiveSheet: React.Dispatch<React.SetStateAction<SheetName>>;
  userId: string;
  userCity?: string | null;
  cities: City[];
  tags: Tag[];
};

export function SheetsRenderer({
  refs,
  control,
  offerControl,
  linkControl,
  editingOffer,
  editingLink,
  offerImage,
  pickOfferImage,
  pickAvatarImage,
  onSubmitProfile,
  onSubmitOffer,
  onSubmitLink,
  closeAll,
  setActiveSheet,
  userId,
  userCity,
  cities,
  tags,
}: Props) {
  return (
    <>
      <ProfileSheet
        sheetRef={refs.profile}
        control={control}
        onSubmit={onSubmitProfile}
        cities={cities}
        tags={tags}
        close={closeAll}
        setActiveSheet={setActiveSheet}
      />
      <AvatarSheet
        sheetRef={refs.avatar}
        selectedAvatar={undefined}
        pickAvatar={pickAvatarImage}
        close={closeAll}
        setActiveSheet={setActiveSheet}
      />
      <OfferSheet
        sheetRef={refs.offer}
        control={offerControl}
        editingOffer={editingOffer}
        offerImage={offerImage}
        pickOfferImage={pickOfferImage}
        onSubmit={onSubmitOffer}
        close={closeAll}
        setActiveSheet={setActiveSheet}
      />
      <LinkSheet
        sheetRef={refs.link}
        label={editingLink?.label ?? ""}
        initialUrl={editingLink?.url ?? ""}
        control={linkControl}
        onSubmit={onSubmitLink}
        close={closeAll}
        setActiveSheet={setActiveSheet}
      />
      <SponsorshipBottomSheet
        sheetRef={refs.sponsorship}
        userId={userId}
        userCity={userCity}
        setActiveSheet={setActiveSheet}
        close={closeAll}
      />
    </>
  );
}
