import _ from "lodash";
import { HelpCircle } from "lucide-react";
import { type ChangeEvent, type FC, memo, useEffect, useRef, useState } from "react";

import { AppPopover } from "@/components/appPopover";
import { cn } from "@/shared/utils";
import { Input } from "@designSystem/components/input";
import { Text } from "@designSystem/components/text";
import type { IFormInputProps } from "./FormInput";

interface IFormInputMacProps extends Omit<IFormInputProps, "type" | "value"> {
  value?: any;
}

const SEPARATOR = ":";
const INPUT_COUNT = 6;
const MAX_LENGTH = 2;

const FormInputMac: FC<IFormInputMacProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  inputProps,
  label,
  labelClassName,
  inputWrapperClassName,
  onChange,
  placeholder,
  required,
  tooltip,
  value,
  ...props
}) => {
  const [values, setValues] = useState<string[]>(Array(INPUT_COUNT).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";
    return "cursor-not-allowed pointer-events-none";
  };

  const validateMacValue = (value: string): boolean => {
    return /^[0-9A-F]*$/.test(value);
  };

  const handleInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = e.target.value.toUpperCase();

    if (!validateMacValue(newValue)) {
      return;
    }

    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    // Call onChange with new value
    const combinedValue = newValues.join(SEPARATOR);
    onChange?.(combinedValue);

    if (newValue.length === MAX_LENGTH && index < INPUT_COUNT - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const parts = pastedText.split(SEPARATOR);

    if (parts.length === INPUT_COUNT) {
      const validParts = parts.every(part => validateMacValue(part.toUpperCase()));
      if (validParts) {
        const newValues = parts.map(part => part.toUpperCase());
        setValues(newValues);
        onChange?.(newValues.join(SEPARATOR));
      }
    }
  };

  useEffect(() => {
    if (value) {
      const parts = value.split(SEPARATOR);
      if (parts.length === INPUT_COUNT) {
        setValues(parts);
      }
    }
  }, [value]);

  return (
    <div data-testid="form-input-mac-test" className={cn("form-input", className)} {...props}>
      {label && (
        <div className="flex-1 min-w-0 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Text
              as="label"
              variant="label"
              className={cn(
                "form-input__label inline-block",
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
            {tooltip && <AppPopover trigger={<HelpCircle className="h-4 w-4 shrink-0" />} content={tooltip} />}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 shrink-0">
        <div className={cn("input-wrapper flex items-center justify-between", inputWrapperClassName)}>
          {Array(INPUT_COUNT)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <Input
                  ref={el => (inputRefs.current[index] = el)}
                  className={cn(
                    "form-input__input text-center text-xs md:text-xs w-full px-1",
                    error && "border-error",
                    disabled && "cursor-not-allowed opacity-50",
                    getReadOnlyClassName(),
                  )}
                  value={values[index]}
                  onChange={handleInputChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  onPaste={handlePaste}
                  maxLength={MAX_LENGTH}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-disabled={disabled}
                  readOnly={readOnly}
                  aria-readonly={readOnly}
                  {...inputProps}
                />
                <div className="shrink-0 mx-1">
                  <span className={cn("text-text-muted-foreground", index === INPUT_COUNT - 1 && "invisible")}>
                    {SEPARATOR}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {error && (
          <Text variant="error" className="form-input__error text-left">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormInputMac, _.isEqual);
export type { IFormInputMacProps };
