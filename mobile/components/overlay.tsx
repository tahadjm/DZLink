import React, { memo } from "react";
import { Pressable } from "react-native";
import { styles } from "./profile/styles";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const OverlayDim = memo(function OverlayDim({ visible, onClose }: Props) {
  if (!visible) return null;
  return <Pressable style={styles.overlay} onPress={onClose} />;
});
