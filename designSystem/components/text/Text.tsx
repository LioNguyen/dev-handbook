import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      // Heading variants
      "heading-1": "text-text-primary text-xl lg:text-2xl font-semibold tracking-tight",

      // Body text variants
      default: "text-text-primary",
      secondary: "text-text-muted-foreground",
      description: "text-text-muted-foreground text-sm",

      // Form related variants
      label: "text-sm font-medium text-text-primary",
      error: "text-sm text-error",
      required: "text-error",

      // Interactive text
      link: "text-text-muted-foreground hover:text-primary hover:underline cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ITextProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType;
  asChild?: boolean;
  htmlFor?: string;
}

const Text = React.forwardRef<HTMLElement, ITextProps>(
  ({ className, variant, as, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : as || "span";

    return (
      <Comp ref={ref} className={cn(textVariants({ variant, className }))} {...props}>
        {children}
      </Comp>
    );
  },
);

Text.displayName = "Text";

export default Text;
export { textVariants };
export type { ITextProps };
