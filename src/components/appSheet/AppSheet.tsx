import { FC, memo, ReactNode, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@designSystem/components/sheet";

interface IAppSheetProps extends Omit<ComponentPropsWithoutRef<typeof SheetContent>, "title"> {
  title?: string | ReactNode;
  description?: string | ReactNode;
  side?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AppSheet: FC<IAppSheetProps> = ({
  children,
  title,
  description,
  side = "right",
  className,
  open,
  onOpenChange,
  ...props
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side={side}
        className={cn(
          "h-[calc(100vh-60px)] top-[60px] border shadow-none",
          "data-[state=open]:backdrop-blur-none",
          "overflow-x-hidden",
          "overflow-y-auto custom-scrollbar",
          className,
        )}
        overlayProps={{
          className: "h-[calc(100vh-61px)] top-[61px] hidden",
        }}
        onInteractOutside={event => {
          const targetElement = event.target as HTMLElement;

          if (targetElement.id !== "side-bar" || !targetElement.closest("#side-bar")) {
            event.preventDefault();
          }
        }}
        {...props}
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-lg">{title}</SheetTitle>
          <SheetDescription className="font-medium text-xs text-text-muted-foreground">{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default memo(AppSheet);
export type { IAppSheetProps };
