/* eslint-disable react-hooks/exhaustive-deps */
import _, { isEqual } from "lodash";
import { ChevronDown, HelpCircle } from "lucide-react";
import { type ComponentPropsWithRef, type FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppPopover } from "@/components/appPopover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { IFormBase, ISelectOption } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@designSystem/components/command";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@designSystem/components/select";
import { Text } from "@designSystem/components/text";

interface IFormSelectProps extends IFormBase {
  selectProps?: Omit<ComponentPropsWithRef<typeof Select>, "id" | "onValueChange" | "value">;
  errorClassName?: string;
  labelClassName?: string;
  selectWrapperClassName?: string;
  onChange?: (value: any) => void;
  options?: ISelectOption[];
  value?: any;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  onSearch?: (searchTerm: string) => void;
  searchDebounce?: number;
  searchPlaceholder?: string;
}

const FormSelect: FC<IFormSelectProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  selectProps,
  label,
  labelClassName,
  errorClassName,
  selectWrapperClassName,
  onChange,
  options = [],
  placeholder,
  required,
  tooltip,
  value,
  onLoadMore,
  hasMore = false,
  loading = false,
  onSearch,
  searchDebounce = 300,
  searchPlaceholder,
  ...props
}) => {
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, searchDebounce);

  const filteredOptions = options.filter(option => {
    return (
      String(option?.value)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(option?.label)?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getOptionLabel = (value: any) => {
    const option = options.find(opt => {
      return opt.value === value;
    });
    return option?.label || "";
  };

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";

    return "cursor-not-allowed pointer-events-none";
  };

  const handleValueChange = (selectedValue: any) => {
    if (disabled) return;

    if (typeof selectedValue === "object" && selectedValue !== null && selectedValue.id) {
      const option = options.find(opt => typeof opt.value === "object" && opt.value.id === selectedValue.id);
      setSelectValue(option?.value || selectedValue);
    } else {
      setSelectValue(selectedValue);
    }
    setOpen(false);
    setSearchTerm("");
  };

  const handleSearch = (value: string) => {
    if (disabled) return;
    setSearchTerm(value);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (disabled || !hasMore || loading) return;

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

  const formSelectButton = (
    <Button
      variant="outline"
      className={cn(
        "w-full justify-between text-left font-normal",
        !selectValue && "text-text-muted-foreground",
        error && "border-error",
        disabled && "cursor-not-allowed opacity-50 pointer-events-none",
        getReadOnlyClassName(),
      )}
      disabled={disabled}
      aria-disabled={disabled}
      aria-readonly={readOnly}
    >
      <span className="flex-1 truncate">{getOptionLabel(selectValue) || placeholder}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  );

  useEffect(() => {
    if (!isEqual(selectValue, value)) {
      setSelectValue(value);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(selectValue);
  }, [selectValue]);

  useEffect(() => {
    if (!disabled) {
      onSearch?.(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, disabled]);

  return (
    <div data-testid="form-select-test" className={cn("form-select", className)} {...props}>
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            as="label"
            variant="label"
            className={cn(
              "form-select__label block",
              disabled && "text-text-muted-foreground cursor-not-allowed",
              getReadOnlyClassName(),
              labelClassName,
            )}
            htmlFor={id}
          >
            {label}
            {required && !readOnly && (
              <Text variant="required" className="ml-0.5" aria-hidden="true">
                *
              </Text>
            )}
          </Text>
          {tooltip && <AppPopover trigger={<HelpCircle className="h-4 w-4" />} content={tooltip} />}
        </div>
      )}

      {/* Content */}
      <div className={cn("select-wrapper", selectWrapperClassName)}>
        {disabled || readOnly ? (
          formSelectButton
        ) : (
          <Select
            open={disabled ? false : open}
            onOpenChange={disabled ? undefined : setOpen}
            value={typeof selectValue === "object" ? selectValue?.id : selectValue}
            onValueChange={handleValueChange}
            disabled={disabled}
            aria-disabled={disabled}
            {...selectProps}
          >
            <SelectTrigger
              className={cn(
                "form-select__trigger",
                error && "border-error",
                disabled && "cursor-not-allowed opacity-50",
                getReadOnlyClassName(),
              )}
            >
              <SelectValue placeholder={placeholder}>{getOptionLabel(selectValue)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <Command shouldFilter={false}>
                {onSearch && (
                  <CommandInput
                    placeholder={searchPlaceholder || t("search")}
                    value={searchTerm}
                    onValueChange={handleSearch}
                    disabled={disabled}
                    className={cn(disabled && "cursor-not-allowed opacity-50")}
                  />
                )}
                <CommandList
                  className={cn("max-h-[200px] overflow-auto", disabled && "pointer-events-none")}
                  onScroll={handleScroll}
                  onWheel={e => {
                    if (disabled) return;
                    e.stopPropagation();
                    const target = e.currentTarget;
                    target.scrollTop += e.deltaY;
                  }}
                >
                  {!loading && filteredOptions.length === 0 && <CommandEmpty>{t("no_results")}</CommandEmpty>}
                  <CommandGroup>
                    {filteredOptions.map(option => (
                      <CommandItem
                        key={typeof option.value === "object" ? option.value.id : option.value}
                        value={option.value}
                        onSelect={() => handleValueChange(option.value)}
                        disabled={disabled}
                        className={cn(disabled && "cursor-not-allowed opacity-50")}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {loading && <Loading />}
                </CommandList>
              </Command>
            </SelectContent>
          </Select>
        )}
        {error && (
          <Text variant="error" className={cn("form-select__error text-left mt-1", errorClassName)}>
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormSelect, _.isEqual);
export type { IFormSelectProps };
