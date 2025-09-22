
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { Linking } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const openLink = async (url: string) => {
  try {
    console.log("Opening link:", url);
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Unsupported URL:", url);
    }
  } catch (err) {
    console.error("Failed to open URL:", err);
  }
};


export * from "./filters";
export * from "./helpers";
export * from "./truncate-text";

