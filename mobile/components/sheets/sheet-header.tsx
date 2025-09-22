import { X } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SheetHeaderProps = {
  title: string;
  onClose?: () => void;
};

export function SheetHeader({ title, onClose }: SheetHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-xl font-avenirBold">{title}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <X size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
    }
