export type PackKey = "bronze" | "silver" | "gold";

export type SponsorshipPack = {
  id: string;
  key: PackKey | string;
  title: string;
  price: number; // in cents or DZD
  currency: string;
  durationDays: number;
  benefits: string[];
  priorityScore?: number;
};

export type SponsorshipRecord = {
  id: string;
  userId: string;
  packId: string;
  packKey: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  status: "pending" | "active" | "expired" | "cancelled";
  amountPaid?: number;
  currency?: string;
};
