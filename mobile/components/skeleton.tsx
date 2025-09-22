import clsx from "clsx";
import React, { memo, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type SkeletonProps = {
  /**
   * Tailwind or custom className for layout (flex, width, height, etc.)
   */
  className?: string;

  /**
   * Skeleton base color
   */
  color?: string;

  /**
   * Border radius for rounded skeletons
   */
  borderRadius?: number;

  /**
   * Pulse animation duration (ms)
   */
  duration?: number;

  /**
   * Additional style overrides
   */
  style?: ViewStyle;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Animated.View>,
  "style"
>;

const Skeleton: React.FC<SkeletonProps> = memo(
  ({
    className,
    color = "#E0E0E0",
    borderRadius = 8,
    duration = 1000,
    style,
    ...props
  }) => {
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration }),
          withTiming(1, { duration })
        ),
        -1, // infinite
        true // reverse to avoid jump
      );
    }, [duration, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      backgroundColor: color,
    }));

    return (
      <Animated.View
        accessibilityRole="progressbar"
        aria-busy={true}
        style={[animatedStyle, style]}
        className={clsx("bg-gray-200", className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
