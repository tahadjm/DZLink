import { Trash2 } from "lucide-react-native";
import React, { memo, useMemo, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

import { Skeleton } from "../skeleton";
import { TruncatedText } from "../truncate-text";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

import { formatRelativeDate, getInitials } from "@/libs/utils";
import { Offer } from "@/types";

type Variant = "list" | "grid";

type OfferCardProps = {
  offer: Offer;
  loading: boolean;
  onPress: () => void;
  onDelete?: () => void;
  variant?: Variant;
  showTimestamp?: boolean;
  testID?: string;
  editMode?: boolean;
};

function colorFromId(id: string) {
  const colors = [
    "#F97316",
    "#06B6D4",
    "#7C3AED",
    "#EF4444",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = (hash << 5) - hash + id.charCodeAt(i);
  const idx = Math.abs(hash) % colors.length;
  return colors[idx];
}

export const OfferCard = memo(function OfferCard({
  offer,
  loading,
  showTimestamp = true,
  onPress,
  onDelete,
  editMode = false,
}: OfferCardProps) {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const initials = useMemo(() => getInitials(offer.title), [offer.title]);
  const placeholderBg = useMemo(() => colorFromId(offer.id), [offer.id]);
  const createdText = useMemo(
    () => formatRelativeDate(offer.createdAt),
    [offer.createdAt]
  );

  if (loading)
    return (
      <View className="flex-1 flex-col gap-3 px-4">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <View key={idx} className="flex-row items-center gap-2 mx-2">
              <Skeleton className="w-[90px] h-[90px] rounded-2xl border border-border" />
              <View className="items-start justify-center w-80">
                <View className="flex-row w-full justify-between">
                  <Skeleton className="h-5 w-20 mb-3 rounded-md" />
                  <Skeleton className="h-5 w-8 mb-3 rounded-md" />
                </View>
                <Skeleton className="h-4 w-80 mb-3 rounded-md" />
                <Skeleton className="h-4 w-60 mb-3 rounded-md" />
              </View>
            </View>
          ))}
      </View>
    );

  return (
    <View className="relative">
      {/* Card content */}
      <TouchableOpacity
        className="flex-row items-center bg-card rounded-2xl border border-border mx-2 p-2"
        onPress={onPress}
        disabled={editMode} // prevent navigation while editing
        activeOpacity={0.8}
      >
        <View className="mr-3">
          {offer.imageUrl && !imageError ? (
            <View className="relative">
              <Image
                source={
                  typeof offer.imageUrl === "string"
                    ? { uri: offer.imageUrl }
                    : offer.imageUrl
                }
                className="w-[88px] h-[88px] rounded-xl bg-gray-100"
                resizeMode="cover"
                onLoadStart={() => {
                  setImageLoading(true);
                  setImageError(false);
                }}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                accessibilityIgnoresInvertColors
              />
              {imageLoading && (
                <View className="absolute inset-0 items-center justify-center rounded-xl bg-black/10">
                  <ActivityIndicator />
                </View>
              )}
            </View>
          ) : (
            <View
              className="w-[88px] h-[88px] rounded-xl items-center justify-center"
              style={{ backgroundColor: placeholderBg }}
            >
              <Text className="text-white font-bold text-2xl">{initials}</Text>
            </View>
          )}
        </View>

        <View className="flex-1 justify-center pr-3">
          <View className="flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              className="text-base font-bold text-slate-900 flex-1 mr-2"
            >
              {offer.title}
            </Text>
            {showTimestamp && !editMode && (
              <Text
                className="text-xs text-slate-400 ml-2"
                accessibilityLabel={`created ${createdText}`}
              >
                {createdText}
              </Text>
            )}
          </View>
          {offer.description && (
            <TruncatedText
              text={offer.description}
              maxLength={80}
              showMore={false}
            />
          )}
        </View>
      </TouchableOpacity>

      {editMode && (
        <View className="absolute top-2 right-4">
          <Button
            onPress={onDelete}
            size="icon"
            variant="destructive"
            className="rounded-full shadow-md"
          >
            <Trash2 size={18} color="white" />
          </Button>
        </View>
      )}
    </View>
  );
});
