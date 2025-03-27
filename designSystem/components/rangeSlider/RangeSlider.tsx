import { forwardRef, useCallback, useEffect, useState } from "react";

import { cn } from "@/shared/utils";

interface RangeSliderProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  ({ className, min = 0, max = 100, step = 1, defaultValue = 0, disabled, onChange, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue);
    const [thumbPosition, setThumbPosition] = useState(0);

    const calculateThumbPosition = useCallback(() => {
      const pos = ((value - min) / (max - min)) * 100;
      setThumbPosition(pos);
      onChange?.(value);
    }, [value, min, max, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
      calculateThumbPosition();
    }, [calculateThumbPosition]);

    return (
      <div ref={ref} className={cn("relative max-w-xl w-full pb-8", className)} {...props}>
        <div className="relative">
          {/* Main container with min, track, and max */}
          <div className="absolute inset-x-0 top-0 flex items-center gap-4">
            {/* Min value */}
            <span className="text-sm font-medium text-background-secondary">{min}</span>

            {/* Track container */}
            <div className="relative grow">
              {/* Custom Thumb */}
              <div
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${thumbPosition}%`,
                  top: "50%",
                }}
              >
                {/* Thumb Circle */}
                <div className="w-4 h-4 rounded-full bg-white border-2 border-background-secondary shadow-xs" />
                {/* Value below thumb */}
                <div className="absolute w-full text-center text-sm top-5 font-medium text-background-secondary">
                  {value}
                </div>
              </div>

              {/* Range Input */}
              <input
                className={cn(
                  "absolute z-30 w-full h-2 appearance-none bg-transparent cursor-pointer",
                  // Hide default thumb
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:w-6",
                  "[&::-webkit-slider-thumb]:h-6",
                  "[&::-webkit-slider-thumb]:bg-transparent",
                  "[&::-moz-range-thumb]:appearance-none",
                  "[&::-moz-range-thumb]:w-6",
                  "[&::-moz-range-thumb]:h-6",
                  "[&::-moz-range-thumb]:bg-transparent",
                  "[&::-webkit-slider-runnable-track]:appearance-none",
                  "[&::-moz-range-track]:appearance-none",
                  disabled && "cursor-not-allowed",
                )}
                type="range"
                step={step}
                min={min}
                max={max}
                value={value}
                disabled={disabled}
                onChange={handleChange}
              />

              {/* Track Background */}
              <div className="relative h-2">
                <div className="absolute z-10 inset-0 rounded-full bg-gray-200" />
                <div
                  className="absolute z-10 left-0 h-full rounded-full bg-background-secondary"
                  style={{ width: `${thumbPosition}%` }}
                />
              </div>
            </div>

            {/* Max value */}
            <span className="text-sm font-medium text-right text-background-secondary">{max}</span>
          </div>
        </div>
      </div>
    );
  },
);

RangeSlider.displayName = "RangeSlider";

export default RangeSlider;
