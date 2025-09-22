import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLeadForm } from "@/hooks/profile/useLeadForm";
import { LeadFormSchema } from "@/libs/helpers/leadFormValidator";
import { Offer } from "@/types";

interface LeadFormBottomSheetProps {
  offers: Offer[];
  onSubmit: (data: LeadFormSchema) => void;
}

export const LeadFormBottomSheet = forwardRef<
  BottomSheet,
  LeadFormBottomSheetProps
>(({ offers, onSubmit }, ref) => {
  const { control, handleSubmit, reset } = useLeadForm();

  const handleFormSubmit = (values: LeadFormSchema) => {
    onSubmit(values);
    reset();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={["65%"]}
      enablePanDownToClose
      index={-1}
      backgroundStyle={{ borderRadius: 24 }}
    >
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <Text className="text-xl font-avenirBold mb-4">Contact Seller</Text>

        {/* Name */}
        <View className="mb-4">
          <Input
            control={control}
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            iconName="account-outline"
            rules={{ required: "Name is required" }}
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Input
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="email-outline"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            }}
          />
        </View>

        {/* Message */}
        <View className="mb-4">
          <Input
            control={control}
            name="message"
            label="Message"
            placeholder="Write your message..."
            multiline
            iconName="message-text-outline"
            rules={{ required: "Message is required" }}
          />
        </View>

        {/* (Optional) Offer select can go here */}

        <Button
          className="mt-4 w-full"
          size="xl"
          onPress={handleSubmit(handleFormSubmit)}
        >
          <Text className="text-white font-avenirBold">Send</Text>
        </Button>
      </BottomSheetView>
    </BottomSheet>
  );
});

LeadFormBottomSheet.displayName = "LeadFormBottomSheet";
