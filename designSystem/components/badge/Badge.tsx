import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-text-secondary shadow-sm hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-text-primary hover:bg-secondary/80",
        outline: "text-text-primary",
        active:
          "border-badge-active-border bg-badge-active-background text-badge-active-foreground hover:bg-badge-active-background/50",
        inactive:
          "border-badge-inactive-border bg-badge-inactive-background text-badge-inactive-foreground hover:bg-badge-inactive-background/50",
        expired:
          "border-badge-expired-border bg-badge-expired-background text-badge-expired-foreground hover:bg-badge-expired-background/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };
