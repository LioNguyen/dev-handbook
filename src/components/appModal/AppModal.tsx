import { DialogProps } from "@radix-ui/react-dialog";
import { memo, type ReactNode } from "react";

import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@designSystem/components/dialog";

interface IAppModalProps extends IComponentBase {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  dialogProps?: Omit<DialogProps, "open" | "onOpenChange">;
}

const AppModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
  dialogProps,
  ...props
}: IAppModalProps) => {
  const sizeClasses = {
    sm: "sm:max-w-[425px]",
    md: "sm:max-w-[600px]",
    lg: "sm:max-w-[800px]",
    xl: "sm:max-w-[1140px]",
    "2xl": "sm:max-w-[1400px]",
    full: "sm:max-w-[calc(100vw-2rem)]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false} {...dialogProps}>
      <DialogContent
        className={cn(
          "max-h-[calc(100vh-2rem)] overflow-y-auto border-border bg-background max-w-[90vw] sm:max-h-[calc(100vh-4rem)]",
          sizeClasses[size],
          className,
        )}
        overlayProps={{
          className: "hidden",
        }}
        onPointerDownOutside={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        {...props}
      >
        {/* Header */}
        <DialogHeader>
          {title && <DialogTitle className="text-foreground">{title}</DialogTitle>}
          {description && <DialogDescription className="text-text-muted-foreground">{description}</DialogDescription>}
        </DialogHeader>

        {/* Content */}
        {children}

        {/* Footer */}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default memo(AppModal);
export type { IAppModalProps };
