import { Check, Copy } from "lucide-react";
import { FC, memo, useEffect, useRef, useState } from "react";

import { cn, formatValue, type INumberFormatOptions } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Text } from "@designSystem/components/text";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@designSystem/components/tooltip";

interface IAppTableCellProps {
  value: string | number | null | undefined;
  className?: string;
  numberFormat?: INumberFormatOptions;
  width?: number;
  showCopyIcon?: boolean;
}

const AppTableCell: FC<IAppTableCellProps> = ({ value, className, numberFormat, width, showCopyIcon = false }) => {
  // State for tooltip visibility and copy feedback
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  // Check for content overflow to show/hide tooltip
  useEffect(() => {
    const checkOverflow = () => {
      if (cellRef.current) {
        const isOverflowing = cellRef.current.scrollWidth > cellRef.current.clientWidth;
        setShowTooltip(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [value]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  // Format the display value
  const formattedValue = formatValue(value, numberFormat);

  // Calculate container style for fixed width
  const containerStyle = width
    ? {
        width: `${width}px`,
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
      }
    : undefined;

  // Cell content with optional copy button
  const content = (
    <div className="flex items-center gap-1" style={containerStyle}>
      <div data-testid="table-cell-content" ref={cellRef} className={cn("text-sm font-normal truncate", className)}>
        {formattedValue}
      </div>
      {showCopyIcon && (
        <Button
          variant="ghost"
          onClick={e => {
            e.stopPropagation();
            handleCopy();
          }}
          className="p-0 -translate-x-1 hover:bg-transparent"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="text-primary" style={{ width: 16 }} />
          ) : (
            <Copy className="text-text-muted-foreground" style={{ width: 16 }} />
          )}
        </Button>
      )}
    </div>
  );

  // Wrap with tooltip if content is truncated
  if (!showTooltip) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-[80vw] p-2" align="center">
          <Text className="text-sm text-text-secondary">{formattedValue}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default memo(AppTableCell);
export type { IAppTableCellProps };
