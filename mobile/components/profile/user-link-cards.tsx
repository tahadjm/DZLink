import { Edit, Link, LucideGripVertical } from "lucide-react-native";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

import { Card, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Skeleton } from "../skeleton";
import { Button } from "../ui/button";

type SocialLinkCardProps = {
  label: string;
  url: string;
  onPress: (url: string) => void;
  onEdit: () => void;
  loading: boolean;
  editMode?: boolean;
};

export const SocialLinkCard: React.FC<SocialLinkCardProps> = ({
  label,
  url,
  onPress,
  onEdit,
  loading,
  editMode = false,
}) => {
  if (loading) {
    return (
      <Card className="rounded-3xl border-2 px-6 py-4 ">
        <CardHeader className="flex-row items-center justify-between mr-3">
          <View className="flex-row items-center gap-6">
            <Skeleton className="w-5 h-8 rounded-md" />
            <View className="flex-col gap-2">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-4 w-44 rounded-md" />
            </View>
          </View>
          <Skeleton className="w-9 h-9 rounded-lg" />
        </CardHeader>
      </Card>
    );
  }
  return (
    <View className="flex-col w-full flex-1">
      <Card className="rounded-3xl border-2  p-3">
        <CardHeader className="flex-row items-center justify-between mr-3">
          <View className="flex-row items-center gap-6 ">
            <View className="flex-row items-center gap-2">
              <LucideGripVertical size={20} color="#666" />
            </View>
            {onPress && url && (
              <TouchableOpacity onPress={() => onPress(url)}>
                <View className="flex-col gap-1">
                  <Text className="text-lg font-avenirBold">{label}</Text>
                  <Text className="text-md text-muted-foreground">{url}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {editMode ? (
            <View className="flex-col max-w-sm">
              {onEdit && (
                <Button
                  className="items-center justify-center bg-transparent border-none "
                  size="icon"
                  onPress={() => onEdit?.()}
                >
                  <Edit color={"gray"} size={20} />
                </Button>
              )}
            </View>
          ) : (
            <Pressable
              className="items-center justify-center"
              onPress={() => onEdit?.()}
            >
              <Link color={"gray"} size={28} />
            </Pressable>
          )}
        </CardHeader>
      </Card>
    </View>
  );
};
