import * as React from "react";
import { cn } from "@/libs/utils";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import {
  Fallback ,
} from "@radix-ui/react-avatar";
// Primitives
const AvatarPrimitiveRoot = AvatarPrimitive.Root;
const AvatarPrimitiveImage = AvatarPrimitive.Image;
const AvatarPrimitiveFallback = AvatarPrimitive.Fallback;



// Avatar Root
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveRoot
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitiveRoot.displayName;

// Avatar Image
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveImage>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveImage
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitiveFallback
> & {
  initials?: string;
  fallbackIcon?: React.ReactNode;
};

 const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveFallback>,
  AvatarFallbackProps
>(({ className, initials, fallbackIcon, ...props }, ref) => {
  return (
    <AvatarPrimitiveFallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    >
    </AvatarPrimitiveFallback>
  );
});
AvatarFallback.displayName = "AvatarFallback";


export { Avatar, AvatarFallback, AvatarImage };

