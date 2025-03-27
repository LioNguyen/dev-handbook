/* eslint-disable react-hooks/exhaustive-deps */
import { format, set } from "date-fns";
import { isEqual } from "lodash";
import { CalendarIcon, X } from "lucide-react";
import { type FC, memo, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

import { DATE_PICKER_OPTIONS } from "@/shared/constants";
import { IComponentBase } from "@/shared/types";
import { cn, parseDate } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Calendar } from "@designSystem/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@designSystem/components/select";

interface ITableDateRangePickerFilterProps extends IComponentBase {
  errorClassName?: string;
  labelClassName?: string;
  datePickerClassName?: string;
  datetimeFormat?: string;
  numberOfMonths?: number;
  placeholder?: string;
  value?: { start_at?: string; end_at?: string };
}

const TableDateRangePickerFilter: FC<ITableDateRangePickerFilterProps> = ({
  className,
  datePickerClassName,
  datetimeFormat = "yyyy-MM-dd",
  numberOfMonths = 2,
  onChange,
  placeholder,
  value,
  ...props
}) => {
  // Hooks
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (value?.start_at || value?.end_at) {
      return {
        from: value.start_at ? parseDate(value.start_at) : undefined,
        to: value.end_at ? parseDate(value.end_at) : undefined,
      };
    }
    return undefined;
  });

  // Add state to control Popover open/close status
  const [open, setOpen] = useState(false);

  // Event handlers
  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);

    if (newRange?.from || newRange?.to) {
      // Get current time
      const now = new Date();
      const timeSettings = {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds(),
      };

      // Set both dates with current time
      const fromWithTime = newRange.from ? set(newRange.from, timeSettings) : undefined;
      const toWithTime = newRange.to ? set(newRange.to, timeSettings) : undefined;

      onChange?.({
        start_at: fromWithTime ? fromWithTime.toISOString() : undefined,
        end_at: toWithTime ? toWithTime.toISOString() : undefined,
      });

      // Close popover if both dates are selected
      if (newRange.from && newRange.to) {
        setOpen(false);
      }
    } else {
      onChange?.({ start_at: undefined, end_at: undefined });
    }
  };

  const handleQuickSelect = (option: string) => {
    const now = new Date();
    const days = parseInt(option);

    if (days === 0) {
      // Today only
      handleDateRangeChange({ from: now, to: now });
    } else {
      const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      handleDateRangeChange({ from: now, to: endDate });
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent calendar popup from opening
    setDateRange(undefined);
    onChange?.({ start_at: undefined, end_at: undefined });
  };

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange) return null;

    if (dateRange.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, datetimeFormat)} - ${format(dateRange.to, datetimeFormat)}`;
      }
      return format(dateRange.from, datetimeFormat);
    }
    return null;
  };

  // UI Elements
  const dateRangePickerButton = (
    <div className="relative">
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-1 px-2 h-[30px] w-full -translate-y-0.5",
          "text-left font-medium",
          dateRange && "pr-8", // Add padding for clear button
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className="translate-y-0.5">
          {formatDateRange() || placeholder || t("form.date_range_picker_placeholder", "Select date range")}
        </span>
      </Button>
      {dateRange && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          onClick={handleClear}
          title="Clear date range"
        >
          <X className="h-4 w-4 text-text-muted-foreground" />
        </div>
      )}
    </div>
  );

  // Update local state when prop value changes
  useEffect(() => {
    if (value?.start_at || value?.end_at) {
      const newRange = {
        from: value.start_at ? parseDate(value.start_at) : undefined,
        to: value.end_at ? parseDate(value.end_at) : undefined,
      };

      if (!isEqual(newRange, dateRange)) {
        setDateRange(newRange);
      }
    } else if (dateRange && (dateRange.from || dateRange.to)) {
      setDateRange(undefined);
    }
  }, [value]);

  // Render component
  return (
    <div
      data-testid="table-date-range-picker-filter-test"
      className={cn("table-date-range-picker-filter", className)}
      {...props}
    >
      <div
        className={cn(
          "date-range-picker-wrapper border-2 border-dashed border-border-secondary rounded-md h-8",
          datePickerClassName,
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{dateRangePickerButton}</PopoverTrigger>
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
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={numberOfMonths}
                initialFocus
                defaultMonth={new Date()}
                toDate={undefined}
                fromDate={undefined}
                fixedWeeks
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default memo(TableDateRangePickerFilter, isEqual);
export type { ITableDateRangePickerFilterProps };
