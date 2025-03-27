/* eslint-disable react-hooks/exhaustive-deps */
import { format, set } from "date-fns";
import _ from "lodash";
import { CalendarIcon, HelpCircle, X } from "lucide-react";
import { type FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppPopover } from "@/components/appPopover";
import { DATE_PICKER_OPTIONS } from "@/shared/constants";
import { IFormBase } from "@/shared/types";
import { cn, parseDate } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Calendar } from "@designSystem/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@designSystem/components/select";
import { Text } from "@designSystem/components/text";

interface IFormDatePickerProps extends IFormBase {
  errorClassName?: string;
  labelClassName?: string;
  datePickerClassName?: string;
  datetimeFormat?: string;
}

const FormDatePicker: FC<IFormDatePickerProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  label,
  labelClassName,
  errorClassName,
  datePickerClassName,
  datetimeFormat = "yyyy-MM-dd",
  onChange,
  placeholder,
  required,
  tooltip,
  value,
  ...props
}) => {
  // Hooks
  const { t } = useTranslation();
  const initialDate = parseDate(value);
  const [date, setDate] = useState<Date | undefined>(initialDate);

  // Add state to control Popover open/close status
  const [open, setOpen] = useState(false);

  // Update local state when prop value changes
  useEffect(() => {
    const newDate = parseDate(value);
    if (!_.isEqual(newDate, date)) {
      setDate(newDate);
    }
  }, [value]);

  // Event handlers
  const handleDateChange = (newDate: Date | undefined) => {
    if (disabled) return;

    setDate(newDate);
    if (newDate) {
      // Get current time
      const now = new Date();
      // Combine selected date with current time
      const dateWithCurrentTime = set(newDate, {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds(),
      });

      onChange?.(format(dateWithCurrentTime, datetimeFormat));
      // Close Popover after date selection
      setOpen(false);
    } else {
      onChange?.(undefined);
    }
  };

  const handleQuickSelect = (daysToAdd: string) => {
    const now = new Date();
    const newDate = new Date(now.getTime() + parseInt(daysToAdd) * 24 * 60 * 60 * 1000);
    handleDateChange(newDate);
    // Close Popover after quick selection
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    if (disabled) return;

    e.stopPropagation(); // Prevent calendar popup from opening
    setDate(undefined);
    onChange?.(undefined);
  };

  // UI Elements
  const datePickerButton = (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-text-muted-foreground",
          error && "border-error",
          date && "pr-8", // Add padding for clear button
          disabled && "cursor-not-allowed opacity-50 pointer-events-none",
          readOnly && "cursor-not-allowed pointer-events-none",
        )}
        disabled={disabled}
        aria-disabled={disabled}
        aria-readonly={readOnly}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? (
          format(date, datetimeFormat)
        ) : (
          <span>{placeholder || datetimeFormat || t("form.date_picker_placeholder")}</span>
        )}
      </Button>
      {date && !disabled && !readOnly && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          onClick={handleClear}
          title="Clear date"
        >
          <X className="h-4 w-4 text-text-muted-foreground" />
        </div>
      )}
    </div>
  );

  // Render component
  return (
    <div data-testid="form-date-picker-test" className={cn("form-date-picker", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            data-testid="text-label"
            as="label"
            variant="label"
            className={cn(
              "form-date-picker__label block",
              labelClassName,
              disabled && "text-text-muted-foreground cursor-not-allowed",
            )}
            htmlFor={id}
          >
            {label}
            {required && !readOnly && (
              <Text data-testid="text-required" variant="required" className="ml-0.5" aria-hidden="true">
                *
              </Text>
            )}
          </Text>
          {tooltip && <AppPopover trigger={<HelpCircle className="h-4 w-4" />} content={tooltip} />}
        </div>
      )}
      <div className={cn("date-picker-wrapper", datePickerClassName)}>
        {disabled || readOnly ? (
          datePickerButton
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{datePickerButton}</PopoverTrigger>
            <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
              <Select onValueChange={handleQuickSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Quick select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {DATE_PICKER_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="rounded-md border">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} />
              </div>
            </PopoverContent>
          </Popover>
        )}
        {error && (
          <Text
            data-testid="text-error"
            variant="error"
            className={cn("form-date-picker__error text-left mt-1", errorClassName)}
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormDatePicker, _.isEqual);
export type { IFormDatePickerProps };
