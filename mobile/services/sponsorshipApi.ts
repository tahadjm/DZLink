// src/services/sponsorship-service.ts
import type { SponsorshipPack, SponsorshipRecord } from "@/types";

const MOCK_PACKS: SponsorshipPack[] = [
  {
    id: "p_bronze",
    key: "bronze",
    title: "Bronze",
    price: 5000,
    currency: "DZD",
    durationDays: 7,
    benefits: ["Pinned in city list"],
  },
  {
    id: "p_silver",
    key: "silver",
    title: "Silver",
    price: 10000,
    currency: "DZD",
    durationDays: 14,
    benefits: ["Highlighted card", "Higher position"],
  },
  {
    id: "p_gold",
    key: "gold",
    title: "Gold",
    price: 20000,
    currency: "DZD",
    durationDays: 30,
    benefits: ["Top position", "Featured badge"],
  },
];

export class SponsorshipService {
  private sponsorships: SponsorshipRecord[] = [];

  /** Get available packs */
  async getPacks(): Promise<SponsorshipPack[]> {
    console.log("SPONSORSHIP_SERVICE: getPacks");
    await new Promise((r) => setTimeout(r, 250));
    return MOCK_PACKS;
  }

  /** Get active sponsorship for user */
  async getActiveSponsorshipForUser(
    userId: string
  ): Promise<SponsorshipRecord | null> {
    await new Promise((r) => setTimeout(r, 200));

    const now = new Date();
    const rec = this.sponsorships.find(
      (s) =>
        s.userId === userId &&
        s.status === "active" &&
        new Date(s.endDate) > now
    );
    return rec ?? null;
  }

  /** Create sponsorship (mock payment integrated) */
  async createSponsorship(
    userId: string,
    packId: string,
    zone?: string
  ): Promise<SponsorshipRecord> {
    await new Promise((r) => setTimeout(r, 600)); // simulate network delay
    const pack = MOCK_PACKS.find((p) => p.id === packId);
    if (!pack) throw new Error("Pack not found");

    const start = new Date();
    const end = new Date(start);
    end.setDate(start.getDate() + pack.durationDays);

    const rec: SponsorshipRecord = {
      id: `s_${Date.now()}`,
      userId,
      packId: pack.id,
      packKey: pack.key,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      status: "active", // in real case: pending -> after payment webhook -> active
      amountPaid: pack.price,
      currency: pack.currency,

    };

    this.sponsorships.push(rec);
    return rec;
  }
}

export const sponsorshipService = new SponsorshipService();
