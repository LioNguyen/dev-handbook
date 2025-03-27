import { isEqual } from "lodash";
import { Check, Filter } from "lucide-react";
import { FC, memo, useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { ITableFilter } from "@/shared/types";
import { cn, truncateText } from "@/shared/utils";
import { Badge } from "@designSystem/components/badge";
import { Button } from "@designSystem/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@designSystem/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/popover";
import { Separator } from "@designSystem/components/separator";
import { Text } from "@designSystem/components/text";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@designSystem/components/tooltip";

// A custom component that shows tooltip only when text overflows
const OverflowingText = ({ children, className }: { children: string; className?: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    // Check if text is overflowing its container
    if (textRef.current) {
      const hasOverflow = textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsOverflowing(hasOverflow);
    }
  }, [children]);

  const content = (
    <div ref={textRef} className={cn("truncate", className)}>
      {children}
    </div>
  );

  if (!isOverflowing) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-[80vw] p-2" align="center">
          <Text className="text-sm text-text-secondary">{children}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ITableFilterProps extends ITableFilter {}

const TableFilter: FC<ITableFilterProps> = ({
  className,
  name,
  options = [],
  label,
  placeholder,
  value,
  onChange,
  onLoadMore,
  hasMore = false,
  loading = false,
  onSearch,
  searchDebounce = 300,
  numberBadgesToShow = 2,
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, searchDebounce);

  const selectedFields = value ?? localSelected;

  // Filter options based on search value
  const filteredOptions = useMemo(() => {
    if (!searchValue.trim()) return options;

    return options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));
  }, [options, searchValue]);

  // Determine if we should show empty state
  const showEmptyState = useMemo(() => {
    if (loading) return false;
    if (!searchValue.trim()) return false;
    return filteredOptions.length === 0;
  }, [loading, searchValue, filteredOptions]);

  const toggleField = (fieldValue: string) => {
    const newSelected = selectedFields.includes(fieldValue)
      ? selectedFields.filter(f => f !== fieldValue)
      : [...selectedFields, fieldValue];

    setLocalSelected(newSelected);
    onChange?.(name, newSelected);
  };

  const clearFilters = () => {
    setLocalSelected([]);
    onChange?.(name, []);
    setOpen(false);
  };

  const getLabelByValue = (fieldValue: string) =>
    options.find(option => option.value === fieldValue)?.label || fieldValue;

  // Handle infinite scroll
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      onLoadMore?.();
    }
  };

  const Loading = () => (
    <Text as="p" variant="description" className="text-center py-4">
      {t("loading")}
    </Text>
  );

  // Handle search
  useEffect(() => {
    onSearch?.(debouncedSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 border-2 border-dashed border-border-secondary rounded-md h-8 min-w-fit whitespace-nowrap overflow-hidden",
        className,
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 px-2 h-[30px]">
            <Filter className="h-4 w-4 mr-1" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} value={searchValue} onValueChange={setSearchValue} />
            <CommandList
              className="min-h-[40px] max-h-[250px]"
              onScroll={handleScroll}
              onWheel={e => {
                e.stopPropagation();
                const target = e.currentTarget;
                target.scrollTop += e.deltaY;
              }}
            >
              {showEmptyState && <CommandEmpty className="text-text-muted-foreground">{t("no_results")}</CommandEmpty>}

              {/* Loading search */}
              {loading && searchValue.length > 0 ? (
                <Loading />
              ) : (
                <CommandGroup>
                  {filteredOptions.map(option => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleField(option.value)}
                      value={option.label}
                      className="pr-2"
                    >
                      <div className="flex items-center justify-between w-full cursor-pointer">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="border border-input w-4 h-4 rounded flex items-center justify-center shrink-0">
                            {selectedFields.includes(option.value) && <Check className="h-3 w-3" />}
                          </div>
                          {/* Use our custom OverflowingText component */}
                          <OverflowingText className="flex-1 min-w-0">{option.label}</OverflowingText>
                        </div>
                      </div>
                    </CommandItem>
                  ))}

                  {/* Loading more */}
                  {loading && !searchValue.length && <Loading />}
                </CommandGroup>
              )}
            </CommandList>
            {selectedFields?.length > 0 && (
              <>
                <CommandSeparator />
                <Button variant="ghost" className="w-full justify-center" onClick={clearFilters}>
                  {t("clear_filters")}
                </Button>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {selectedFields?.length > 0 && (
        <>
          <Separator orientation="vertical" className="h-5 -translate-x-1" />
          <div className="flex-1 flex items-center gap-2 pr-2">
            {selectedFields.slice(0, numberBadgesToShow).map(value => {
              const label = getLabelByValue(value);
              const truncatedLabel = truncateText(label, isMobile ? 5 : 8);
              return (
                <Badge key={value} variant="secondary" className="max-w-[150px] truncate" title={label}>
                  <span className="truncate" aria-label={label}>
                    {truncatedLabel}
                  </span>
                </Badge>
              );
            })}
            {selectedFields.length > numberBadgesToShow && (
              <Badge variant="secondary">
                {numberBadgesToShow > 0 && "+"}
                {selectedFields.length - numberBadgesToShow}
              </Badge>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(TableFilter, isEqual);
export type { ITableFilterProps };
