// src/screens/components/SponsorshipBlock.tsx
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React, { memo } from "react";
import { View } from "react-native";
import { Skeleton } from "../skeleton";
import { styles } from "./styles";

type Props = {
  userCity?: string | null;
  onOpenPromote: () => void;
  onManage: () => void;
  isActive?: boolean;
  daysLeft?: number;
  loading?: boolean;
};

export const SponsorshipBlock = memo(function SponsorshipBlock({
  userCity,
  onOpenPromote,
  onManage,
  isActive = true,
  daysLeft = 20,
  loading,
}: Props) {
  if (loading) {
    return (
      <View style={styles.sponsorshipContainer}>
        <View style={styles.sponsorshipHeaderRow}>
          <Skeleton className="w-28 h-6 rounded-md" />
          <Skeleton className="w-40 h-9 rounded-3xl" />
        </View>
        <View style={styles.sponsorshipBody}>
          <View style={styles.sponsorshipInactiveRow} className="gap-2">
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-40 h-4 rounded-3xl" />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.sponsorshipContainer}>
      {!isActive && (

      <View style={styles.sponsorshipHeaderRow}>
        <Text style={styles.sponsorshipTitle}>Sponsorship</Text>
        <Button size="lg" onPress={onOpenPromote}>
          <Text>Promouvoir</Text>
        </Button>
      </View>
      )}

      <View style={styles.sponsorshipBody}>
        {isActive ? (
          <View style={styles.sponsorshipActiveRow}>
            <View>
              <Text
                style={styles.sponsorshipActiveTitle}
              >{`${daysLeft} jours restants`}</Text>
              <Text style={styles.sponsorshipMeta}>
                Boosté — visible dans {userCity ?? "your city"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.sponsorshipInactiveRow}>
            <Text style={styles.sponsorshipInactiveText}>
              Boostez votre profil — apparaissez en tête des résultats de
              recherche !
            </Text>
            <Text style={styles.sponsorshipSmallMeta}>
              20 packs disponsible
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});
