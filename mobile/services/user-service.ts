import type { Offer, User } from "@/types";
import { mockOffer, mockUsers } from "./__mocks__";

export const userService = {
  async getAllusers(): Promise<User[]> {
    // simulate latency
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 300));
  },

  async getUserById(id: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === id);
    return new Promise((resolve) =>
      setTimeout(() => resolve(user ?? null), 300)
    );
  },

  async getMe(): Promise<User> {
    // assume first user as logged-in
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockUsers[0]), 300)
    );
  },

  async uploadAvatar(avatar: File): Promise<User> {
    // simulate latency
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockUsers[0]), 300)
    );
  },

  async getUserOffers(userId: string): Promise<Offer[]> {
    const offers = mockOffer.filter((o) => o.userId === userId);
    return new Promise((resolve) => setTimeout(() => resolve(offers), 300));
  },
};
