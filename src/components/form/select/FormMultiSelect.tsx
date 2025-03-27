/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import { Check, ChevronsUpDown, HelpCircle, X } from "lucide-react";
import { type FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppPopover } from "@/components/appPopover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { IFormBase, ISelectOption } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Badge } from "@designSystem/components/badge";
import { Button } from "@designSystem/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@designSystem/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/popover";
import { Separator } from "@designSystem/components/separator";
import { Text } from "@designSystem/components/text";

interface IFormMultiSelectProps extends IFormBase {
  commandProps?: React.ComponentPropsWithRef<typeof Command>;
  errorClassName?: string;
  labelClassName?: string;
  selectWrapperClassName?: string;
  onChange?: (value: string[]) => void;
  options?: ISelectOption[];
  value?: string[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onSearch?: (searchTerm: string) => void;
  searchDebounce?: number;
}

const FormMultiSelect: FC<IFormMultiSelectProps> = ({
  className,
  error,
  id,
  commandProps,
  label,
  labelClassName,
  errorClassName,
  selectWrapperClassName,
  onChange,
  options = [],
  placeholder,
  required,
  tooltip,
  value = [],
  onLoadMore,
  hasMore = false,
  loading = false,
  emptyMessage,
  onSearch,
  searchDebounce = 300,
  ...props
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [commandValue, setCommandValue] = useState("");
  const debouncedSearchTerm = useDebounce(commandValue, searchDebounce);

  // Filter selected options from available options
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));
  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(commandValue.toLowerCase()));
  const showEmptyState = !loading && commandValue.length > 0 && !filteredOptions.length;

  // Handle selection of an option
  const handleSelect = (currentValue: string) => {
    const newSelectedValues = selectedValues.includes(currentValue)
      ? selectedValues.filter(value => value !== currentValue)
      : [...selectedValues, currentValue];

    setSelectedValues(newSelectedValues);
    // setCommandValue(""); // Clear search input after selection
  };

  // Handle removal of a selected option
  const handleRemove = (valueToRemove: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedValues(prev => prev.filter(value => value !== valueToRemove));
  };

  // Handle clearing all selected values
  const handleClearAll = () => {
    setSelectedValues([]);
    setOpen(false);
  };

  // Handle infinite scroll
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      onLoadMore?.();
    }
  };

  // Handle command input change
  const handleCommandInputChange = (value: string) => {
    setCommandValue(value);
  };

  const Loading = () => (
    <Text as="p" variant="description" className="text-center py-4">
      {t("loading")}
    </Text>
  );

  // Notify parent component of selected values change
  useEffect(() => {
    onChange?.(selectedValues);
  }, [selectedValues]);

  // Handle search when debounced search term changes
  useEffect(() => {
    onSearch?.(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div data-testid="form-multi-select-test" className={cn("form-multi-select w-full", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            as="label"
            variant="label"
            className={cn("form-multi-select__label block", labelClassName)}
            htmlFor={id}
          >
            {label}
            {required && (
              <Text variant="required" className="ml-0.5" aria-hidden="true">
                *
              </Text>
            )}
          </Text>
          {tooltip && <AppPopover trigger={<HelpCircle className="h-4 w-4" />} content={tooltip} />}
        </div>
      )}
      <div className={cn("form-select-wrapper", selectWrapperClassName)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full h-auto justify-between hover:bg-transparent",
                error && "border-error hover:border-error",
                !selectedValues.length && "text-text-muted-foreground",
              )}
            >
              <div className="flex gap-1 flex-wrap flex-1">
                {selectedOptions.length > 0 ? (
                  <div className="flex gap-1 flex-wrap flex-1 py-0.5">
                    {selectedOptions.map(option => (
                      <Badge key={option.value} variant="secondary" className="rounded-sm px-1 font-normal">
                        {option.label}
                        <div
                          className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={e => handleRemove(option.value, e)}
                        >
                          <X
                            className="h-3 w-3 hover:text-text-muted-foreground"
                            onClick={e => handleRemove(option.value, e)}
                          />
                        </div>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="py-0.5">{placeholder || t("form.multi_select_placeholder")}</span>
                )}
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <div className="flex flex-col max-h-[450px]">
              <Command {...commandProps} className="overflow-hidden">
                <CommandInput
                  placeholder="Search..."
                  value={commandValue}
                  onValueChange={handleCommandInputChange}
                  className="h-9"
                />
                <CommandList
                  className="min-h-[40px] max-h-[250px]"
                  onScroll={handleScroll}
                  onWheel={e => {
                    e.stopPropagation();
                    const target = e.currentTarget;
                    target.scrollTop += e.deltaY;
                  }}
                >
                  {showEmptyState && (
                    <CommandEmpty className="text-text-muted-foreground">
                      {emptyMessage || t("no_results")}
                    </CommandEmpty>
                  )}

                  {/* Loading search */}
                  {loading && commandValue.length > 0 ? (
                    <Loading />
                  ) : (
                    <CommandGroup>
                      {filteredOptions.map(option => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => handleSelect(option.value)}
                          className="cursor-pointer"
                          value={option.label} // Add this to enable filtering by label
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedValues.includes(option.value) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}

                      {/* Loading more */}
                      {loading && !commandValue.length && <Loading />}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
              <Separator className="mt-auto" />
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="h-8 w-full justify-start text-sm"
                  onClick={handleClearAll}
                  disabled={selectedValues.length === 0}
                >
                  {t("clear_all")}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {error && (
          <Text variant="error" className={cn("form-multi-select__error text-left mt-1", errorClassName)}>
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormMultiSelect, _.isEqual);
export type { IFormMultiSelectProps };
