import { Offer } from "@/types";
import { mockOffer } from "./__mocks__/";

let offers: Offer[] = [...mockOffer];

export const offerService = {
  getOffers: async (): Promise<Offer[]> => {
    return Promise.resolve(offers);
  },

  getOffersByUser: async (userId: string): Promise<Offer[]> => {
    return Promise.resolve(offers.filter((o) => o.userId === userId));
  },

  addOffer: async (offer: Partial<Offer>): Promise<Offer> => {
    const now = new Date().toISOString();
    const newOffer: Offer = {
      id: offer.id ?? Date.now().toString(),
      userId: offer.userId!,
      title: offer.title ?? "",
      description: offer.description ?? "",
      price: offer.price ?? 0,
      currency: offer.currency ?? "DZD",
      imageUrl: offer.imageUrl ?? undefined,
      createdAt: now,
      updatedAt: now,
    };

    offers.push(newOffer);
    return Promise.resolve(newOffer);
  },

  updateOffer: async (id: string, update: Partial<Offer>): Promise<Offer | null> => {
    const index = offers.findIndex((o) => o.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedOffer = {
      ...offers[index],
      ...update,
      updatedAt: new Date().toISOString(),
    };
    offers[index] = updatedOffer;

    return Promise.resolve(updatedOffer);
  },

  deleteOffer: async (id: string): Promise<boolean> => {
    const before = offers.length;
    offers = offers.filter((o) => o.id !== id);
    return Promise.resolve(offers.length < before);
  },
};
