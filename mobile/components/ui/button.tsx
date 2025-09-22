import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable } from "react-native";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline: "border border-2 border-border bg-transparent",
        secondary:
          "bg-secondary-foreground web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-background",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
      },
      size: {
        default: "h-10 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-3xl px-4 native:h-11",
        xl: "h-11 rounded-3xl px-8 native:h-14",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-avenirBold text-muted-foreground web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-primary rounded-3xl",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-muted-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "native:text-medium",
        sm: "native:text-sm",
        lg: "native:text-lg",
        xl: "native:text-xl",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    spinnerColor?: string; // Optional prop to customize spinner color
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      loading,
      spinnerColor = "white",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && "web:pointer-events-none",
          buttonTextVariants({ variant, size }),
        )}
      >
        <Pressable
          className={cn(
            props.disabled && "opacity-50 web:pointer-events-none",
            buttonVariants({ variant, size, className }),

          )}
          ref={ref}
          role="button"
          {...props}
        >
          {loading ? <ActivityIndicator color={spinnerColor} /> : children}
        </Pressable>
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

