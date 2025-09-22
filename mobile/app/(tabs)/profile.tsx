import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { OverlayDim } from "@/components/overlay";
import { LinksList } from "@/components/profile/links-list";
import { OffersSection } from "@/components/profile/offers-section";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SheetsRenderer } from "@/components/profile/sheets-renderer";
import { SponsorshipBlock } from "@/components/profile/sponsorship-block";
import { ScreenContainer } from "@/components/screen-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import PreviewFloatingButton from "@/components/PreviewButton";
import { StatsSummary } from "@/components/stats/stats-summary";
import { useProfileActions, useProfileForms } from "@/hooks/profile";
import { useSheet } from "@/hooks/useSheet";

import { cn } from "@/libs/utils";
import { filtersService } from "@/services/filters-service";
import { offerService } from "@/services/offers-service";
import { analyticsService } from "@/services/stats";
import { userService } from "@/services/user-service";
import { City, SourceBreakdown, StatsSummaryDTO, Tag, User } from "@/types";

type LoadingKey = "user" | "stats" | "sources" | "offers";
type LoadingState = Record<LoadingKey, boolean>;

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [stats, setStats] = useState<StatsSummaryDTO>();
  const [sources, setSources] = useState<SourceBreakdown[]>();
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const [editingOffer, setEditingOffer] = useState<any | null>(null);
  const [editingLink, setEditingLink] = useState<{
    label: string;
    url: string;
  } | null>(null);
  const [offerImage, setOfferImage] = useState<string>();
  const [links, setLinks] = useState<Record<string, string>>({});
  const [offers, setOffers] = useState<any[]>([]);

  const [loading, setLoading] = useState<LoadingState>({
    user: false,
    stats: false,
    sources: false,
    offers: false,
  });

  const setLoadingState = (key: LoadingKey, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await filtersService.getCities();
      setCities(cities);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await filtersService.getTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingState("user", true);
      try {
        const user = await userService.getMe();
        console.log("user", user);

        setUser(user);
      } finally {
        setLoadingState("user", false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userLinks: Record<string, string> = {};
    if (user.website) userLinks.Website = user.website;
    if (user.phone) userLinks.WhatsApp = `https://wa.me/${user.phone}`;
    setLinks(userLinks);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const getStats = async () => {
      setLoadingState("stats", true);
      setLoadingState("sources", true);
      try {
        const [stats, sources] = await Promise.all([
          analyticsService.getStatsSummary(user.id),
          analyticsService.getSources(user.id),
        ]);
        setStats(stats);
        setSources(sources);
      } finally {
        setLoadingState("stats", false);
        setLoadingState("sources", false);
      }
    };
    getStats();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchOffers = async () => {
      setLoadingState("offers", true);
      try {
        const offers = await offerService.getOffersByUser(user.id);
        setOffers(offers);
      } finally {
        setLoadingState("offers", false);
      }
    };
    fetchOffers();
  }, [user]);

  const { refs, activeSheet, open, closeAll, setActiveSheet } = useSheet([
    "profile",
    "avatar",
    "offer",
    "link",
    "sponsorship",
  ] as const);

  const isAnySheetOpen = activeSheet !== "none";

  const {
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
  } = useProfileForms(user ?? ({} as User), user?.id ?? "");

  const {
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
  } = useProfileActions({
    user,
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
  });

  const handleEditLink = useCallback(
    (label: string, url: string) => openLinkSheet(label, url),
    [openLinkSheet]
  );

  const avatarPlaceholder = useMemo(
    () => require("@/assets/thumbnails/profile-1.jpg"),
    []
  );

  if (loading.user || !user) {
    return (
      <View className="flex-1 bg-background">
        {/* TODO: Add skeleton loader */}
      </View>
    );
  }
  // {TODO: Add Create porfile form in case  user didnt complete his profile}
  return (
    <View className="flex-1 bg-background">
      <ScreenContainer
        className={cn(
          "flex-1 flex-col",
          isAnySheetOpen ? "opacity-40" : "opacity-100"
        )}
      >
        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <ProfileHeader
              user={user}
              selectedAvatar={selectedAvatar}
              onOpenAvatar={openAvatarSheet}
              onOpenProfile={openProfileSheet}
              avatarPlaceholder={avatarPlaceholder}
              loading={loading.user}
            />
          </CardHeader>

          <Separator className="w-full h-[2px] my-2" />

          <CardContent className="gap-4">
            <LinksList
              links={links}
              onEditLink={handleEditLink}
              loading={loading.user}
              editMode={true}
            />

            <Separator className="w-full h-[2px]" />

            <OffersSection
              offers={offers}
              sectionTitle="Mes Offres"
              loading={loading.offers}
              editMode={true}
              onAddOffer={() => openOfferSheet()}
              onEditOffer={(offer) => openOfferSheet(offer)}
              onDeleteOffer={confirmDeleteOffer} // ✅ add this
            />

            <Separator className="w-full h-[2px]" />

            <SponsorshipBlock
              userCity={user.city}
              onOpenPromote={openSponsorshipSheet}
              onManage={openSponsorshipSheet}
              isActive={true}
              daysLeft={20}
              loading={false}
            />

            <Separator className="w-full h-[2px]" />

            {stats && sources && (
              <StatsSummary
                stats={stats}
                sources={sources}
                loading={loading.stats || loading.sources}
              />
            )}

            <Separator className="w-full h-[2px]" />
          </CardContent>
        </Card>

        <OverlayDim visible={isAnySheetOpen} onClose={closeAll} />
      </ScreenContainer>

      <PreviewFloatingButton disabled={isAnySheetOpen} profile={user} />

      <SheetsRenderer
        refs={refs}
        control={control}
        offerControl={offerControl}
        linkControl={linkControl}
        editingOffer={editingOffer}
        editingLink={editingLink}
        offerImage={offerImage}
        pickOfferImage={pickOfferImage}
        pickAvatarImage={pickAvatarImage}
        onSubmitProfile={handleSubmit(onSubmitProfile)}
        onSubmitOffer={handleOfferSubmit((values) =>
          onSubmitOffer(values, editingOffer, offerImage)
        )}
        onSubmitLink={onSubmitLink}
        closeAll={closeAll}
        setActiveSheet={setActiveSheet}
        userId={user.id}
        userCity={user.city}
        cities={cities}
        tags={tags}
      />
    </View>
  );
}
