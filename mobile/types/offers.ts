export const currencies = ["DZD", "USD"] as const;
export type Currency = (typeof currencies)[number];

export interface Offer {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
