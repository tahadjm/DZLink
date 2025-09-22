import { Offer } from "@/types";

export const mockOffer: Offer[] = [
  {
    id: "1",
    userId: "2",
    title: "Logo  Pack",
    description:
      "3 custom logo concepts with revisions 3 custom logo concepts with revisions 3 custom logo concepts with revisions 3 custom logo concepts with revisions ",
    imageUrl: require("@/assets/uploads/logo-pack.png"),
    price: 1000,
    currency: "DZD",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "1",
    title: "Pack",
    price: 1000,
    currency: "DZD",
    description:
      "3 custom logo concepts with revisions 3 custom logo concepts with revisions 3 custom logo concepts with revisions 3 custom logo concepts with revisions ",
    imageUrl: require("@/assets/uploads/logo-pack.png"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "3",
    title: "Web Development Pack",
    price: 1000,
    currency: "DZD",
    description: "custom logo concepts with revisions",
    imageUrl: require("@/assets/uploads/logo-pack.png"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
