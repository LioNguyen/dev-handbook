/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual, max as maxValue } from "lodash";
import { HelpCircle } from "lucide-react";
import { ComponentPropsWithRef, FC, memo, useEffect, useState } from "react";

import { AppPopover } from "@/components/appPopover";
import { IFormBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { RangeSlider } from "@designSystem/components/rangeSlider";
import { Text } from "@designSystem/components/text";

interface IFormRangeSliderProps extends IFormBase {
  min?: number;
  max?: number;
  step?: number;
  rangeSliderWrapperClassName?: string;
  rangeSliderProps?: Omit<ComponentPropsWithRef<typeof RangeSlider>, "id" | "onChange" | "placeholder" | "value">;
}

const FormRangeSlider: FC<IFormRangeSliderProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  label,
  labelClassName,
  rangeSliderWrapperClassName,
  min,
  max,
  onChange,
  required,
  step,
  tooltip,
  value,
  rangeSliderProps,
  ...props
}) => {
  const [sliderValue, setSliderValue] = useState(value || 0);

  const { className: rangeSliderClassName, ...restRangeSliderProps } = rangeSliderProps || {};

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";

    return "cursor-not-allowed pointer-events-none";
  };

  const handleChange = (val: number) => {
    if (disabled) return;
    setSliderValue(val);
  };

  useEffect(() => {
    if (isEqual(sliderValue, value)) {
      setSliderValue(value ?? 0);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(sliderValue);
  }, [sliderValue]);

  return (
    <div className={cn("form-range-slider", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            as="label"
            variant="label"
            className={cn(
              "form-range-slider__label block",
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
      <div className={cn("range-slider-wrapper relative", rangeSliderWrapperClassName)}>
        <RangeSlider
          className={cn(
            error && "border-error",
            disabled && "opacity-50 cursor-not-allowed",
            getReadOnlyClassName(),
            rangeSliderClassName,
          )}
          min={min}
          max={max}
          step={step}
          defaultValue={maxValue([min, value])}
          onChange={handleChange}
          disabled={disabled}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          {...restRangeSliderProps}
        />
        {error && (
          <Text variant="error" className="form-range-slider__error text-left mt-1">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormRangeSlider, isEqual);
export type { IFormRangeSliderProps };
