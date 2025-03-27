import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/shared/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    style={
      {
        // Set CSS variable for switch width
        "--switch-width": "2rem",
      } as React.CSSProperties
    }
    className={cn(
      "peer inline-flex h-4 shrink-0 cursor-pointer items-center rounded-full shadow-md transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-background-secondary data-[state=unchecked]:bg-input",
      "px-0.5", // Add padding for thumb
      "w-[var(--switch-width)]", // Use CSS variable for width
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 rounded-full bg-white shadow-md transition-transform",
        // Calculate translation: container width - thumb width - padding * 2
        "data-[state=checked]:translate-x-[calc(var(--switch-width)_-_theme(width.3)_-_theme(spacing.1))] data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
