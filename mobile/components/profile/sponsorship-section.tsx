// components/SponsorshipSection.tsx
import {
  getActiveSponsorshipForUser,
  getPacks,
} from "@/services/sponsorshipApi";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { SponsorshipBottomSheet } from "../sheets/sponsorship-bottom-sheet";

type Props = {
  userId: string;
  userCity?: string;
};

export default function SponsorshipSection({ userId, userCity }: Props) {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<any | null>(null);
  const [packsCount, setPacksCount] = useState<number | null>(null);

  // sheet state
  const sheetRef = useRef<BottomSheet | null>(null);
  const [activeSheet, setActiveSheet] = useState<"none" | "sponsorship">(
    "none"
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const rec = await getActiveSponsorshipForUser(userId);
        if (!mounted) return;
        setActive(rec);
        const packs = await getPacks();
        setPacksCount(packs.length);
      } catch (e) {
        console.warn(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [userId]);

  const daysLeft = useMemo(() => {
    if (!active) return 0;
    const now = new Date();
    const end = new Date(active.endDate);
    const diff = Math.ceil(
      (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  }, [active]);

  const openSheet = () => {
    setActiveSheet("sponsorship");
    sheetRef.current?.snapToIndex(0);
  };

  const closeSheet = () => {
    sheetRef.current?.close();
    setActiveSheet("none");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Sponsorship</Text>
        <TouchableOpacity onPress={openSheet} style={styles.primaryButton}>
          <Text style={styles.primaryText}>Promote</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.body}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.body}>
          {active ? (
            <View style={styles.activeRow}>
              <View>
                <Text style={styles.activeTitle}>
                  {active.packKey.toUpperCase()} · {daysLeft}d left
                </Text>
                <Text style={styles.meta}>
                  Boosted — visible in {userCity ?? "your city"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={openSheet}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryText}>Manage</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inactiveRow}>
              <Text style={styles.inactiveText}>
                Boost your profile — appear first in search!
              </Text>
              <Text style={styles.smallMeta}>
                {packsCount != null ? `${packsCount} packs available` : ""}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* BottomSheet integration */}
      <SponsorshipBottomSheet
        sheetRef={sheetRef}
        userId={userId}
        userCity={userCity}
        setActiveSheet={setActiveSheet}
        close={closeSheet}
        onActivated={(newS) => {
          setActive(newS);
          closeSheet();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700" },
  primaryButton: {
    backgroundColor: "#0B60B6",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  primaryText: { color: "#fff", fontWeight: "600" },
  body: { paddingVertical: 8 },
  activeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeTitle: { fontSize: 16, fontWeight: "700" },
  meta: { color: "#666", marginTop: 4 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 12,
  },
  secondaryText: { color: "#0B60B6" },
  inactiveRow: { paddingVertical: 8 },
  inactiveText: { fontSize: 15 },
  smallMeta: { color: "#888", marginTop: 6 },
});
