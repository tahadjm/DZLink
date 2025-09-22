import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { PreviewHeader } from "@/components/preview/preview-header";
import { LinksList } from "@/components/profile/links-list";
import { OffersSection } from "@/components/profile/offers-section";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import { FloatingBackButton } from "@/components/floating-back-button";
import { OverlayDim } from "@/components/overlay";
import { LeadFormBottomSheet } from "@/components/sheets/lead-form-sheet";
import { useSheet } from "@/hooks/useSheet";
import { LeadFormSchema } from "@/libs/helpers/leadFormValidator";
import { userService } from "@/services/user-service";
import { Offer, User } from "@/types";

// ------------------
// Types
// ------------------
type LoadingKey = "user" | "offers";
type LoadingState = Record<LoadingKey, boolean>;

export default function ProfilePreview() {
  // ------------------
  // Router params
  // ------------------
  const { id } = useLocalSearchParams<{ id: string }>();

  // ------------------
  // State
  // ------------------
  const [user, setUser] = useState<User | null>(null);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    user: false,
    offers: false,
  });

  // ------------------
  // Sheets
  // ------------------
  const { refs, activeSheet, open, closeAll } = useSheet(["formLead"] as const);

  const handleSubmitLead = (data: LeadFormSchema) => {
    console.log("Lead submitted:", data);
    // send to API here
    closeAll(); // close after submit
  };

  // ------------------
  // Helpers
  // ------------------
  const setLoadingState = (key: LoadingKey, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const avatarPlaceholder = useMemo(
    () => require("@/assets/thumbnails/profile-1.jpg"),
    []
  );

  const isAnySheetOpen = activeSheet !== "none";

  // ------------------
  // Effects
  // ------------------
  useEffect(() => {
    const fetchUser = async () => {
      setLoadingState("user", true);
      try {
        const u = await userService.getUserById(id);
        if (u) {
          setUser(u);

          const userLinks: Record<string, string> = {};
          if (u.website) userLinks.Website = u.website;
          if (u.phone) userLinks.WhatsApp = `https://wa.me/${u.phone}`;
          setLinks(userLinks);
        }
      } finally {
        setLoadingState("user", false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    const fetchOffers = async () => {
      setLoadingState("offers", true);
      try {
        const o = await userService.getUserOffers(user.id);
        setOffers(o);
      } finally {
        setLoadingState("offers", false);
      }
    };
    fetchOffers();
  }, [user]);

  // ------------------
  // Render
  // ------------------
  if (loading.user || !user) {
    return (
      <View
        className="flex-1 bg-white"
        accessibilityLabel="User preview loading"
      />
    );
  }

  return (
    <View className="flex-1 bg-white" accessibilityLabel="User preview screen">
      <FloatingBackButton />
      <ScreenContainer >
        <Card className="pt-16">
          <CardHeader className="flex-row items-center gap-2">
            <PreviewHeader
              user={user}
              loading={loading.user}
            />
          </CardHeader>
          <Separator className="w-full h-[2px] my-2" />

          <CardContent className="gap-4">
            <LinksList  links={links} loading={loading.user} />

            <Separator className="w-full h-[2px]" />

            <OffersSection
              offers={offers}
              sectionTitle={`Les Offers de ${user.name}`}
              loading={loading.offers}
            />

            <Separator className="w-full h-[2px]" />

            <View className="w-full px-20 justify-center items-center flex-row py-4 shadow-lg">
              <Button
                className="w-full"
                variant="default"
                size="xl"
                onPress={() => open("formLead")}
              >
                <Text>Contact Me</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <OverlayDim visible={isAnySheetOpen} onClose={closeAll} />
      </ScreenContainer>

      {/* Lead Form Bottom Sheet */}
      <LeadFormBottomSheet
        ref={refs.formLead}
        offers={offers}
        onSubmit={handleSubmitLead}
      />
    </View>
  );
}
