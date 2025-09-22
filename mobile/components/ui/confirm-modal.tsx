import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  processing?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  processing = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text className="text-lg font-avenirBold mb-2">{title}</Text>

          {typeof message === "string" ? (
            <Text className="mb-4">{message}</Text>
          ) : (
            message
          )}

          <View style={styles.actions}>
            <Button
              variant="outline"
              className="flex-1 mr-2"
              onPress={onCancel}
              disabled={processing}
            >
              <Text className="text-muted-foreground">{cancelLabel}</Text>
            </Button>
            <Button
              className="flex-1"
              onPress={onConfirm}
              disabled={processing}
            >
              <Text className="text-primary-foreground">
                {processing ? "Processing..." : confirmLabel}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    width: "82%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  actions: { flexDirection: "row", marginTop: 16 },
});
