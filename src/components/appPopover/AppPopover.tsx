import { type FC, memo, ReactNode } from "react";

import { ALIGN, SIDE } from "@/shared/constants";
import { cn } from "@/shared/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/popover";

interface IAppPopoverProps {
  align?: (typeof ALIGN)[keyof typeof ALIGN];
  className?: string;
  content: ReactNode;
  side?: (typeof SIDE)[keyof typeof SIDE];
  trigger: ReactNode;
}

const AppPopover: FC<IAppPopoverProps> = ({ align, className, content, side, trigger }) => {
  return (
    <Popover>
      <PopoverTrigger className="dropdown__trigger cursor-pointer">{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn("dropdown__content", "w-auto p-4", className)}
        side={side || "right"}
        align={align || "start"}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default memo(AppPopover);
export type { IAppPopoverProps };
