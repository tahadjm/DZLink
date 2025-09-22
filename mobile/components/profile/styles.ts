// src/screens/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: -20,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 5,
  },
  sponsorshipContainer: {
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sponsorshipHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sponsorshipTitle: { fontSize: 18, fontWeight: "700" },
  sponsorshipBody: { paddingVertical: 8 },
  sponsorshipActiveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sponsorshipActiveTitle: { fontSize: 16, fontWeight: "700" },
  sponsorshipMeta: { color: "#666", marginTop: 4 },
  sponsorshipInactiveRow: { paddingVertical: 8 },
  sponsorshipInactiveText: { fontSize: 15 },
  sponsorshipSmallMeta: { color: "#888", marginTop: 6 },
});
