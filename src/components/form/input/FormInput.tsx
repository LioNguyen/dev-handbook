import _ from "lodash";
import { Eye, EyeOff, HelpCircle, Copy, Check } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FC,
  type HTMLInputTypeAttribute,
  memo,
  useEffect,
  useState,
} from "react";

import { AppPopover } from "@/components/appPopover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { IFormBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Input } from "@designSystem/components/input";
import { Text } from "@designSystem/components/text";

interface IFormInputProps extends IFormBase {
  inputDelay?: number;
  inputProps?: Omit<ComponentPropsWithRef<typeof Input>, "id" | "onChange" | "placeholder" | "type" | "value">;
  inputWrapperClassName?: string;
  type?: HTMLInputTypeAttribute;
  value?: any;
  showCopyIcon?: boolean;
}

const FormInput: FC<IFormInputProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  inputDelay,
  inputProps,
  label,
  labelClassName,
  inputWrapperClassName,
  onChange,
  placeholder,
  required,
  tooltip,
  type,
  value,
  showCopyIcon = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const debounceValue = useDebounce(inputValue, inputDelay ?? 400);

  const { className: inputClassName, ...restInputProps } = inputProps || {};

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";
    return "cursor-not-allowed pointer-events-none";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setInputValue(e.target.value);
  };

  const togglePasswordVisibility = () => {
    if (disabled) return;
    setShowPassword(prev => !prev);
  };

  const handleCopy = async () => {
    if (disabled) return;
    try {
      await navigator.clipboard.writeText(inputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  useEffect(() => {
    onChange?.(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div data-testid="form-input-test" className={cn("form-input", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            as="label"
            variant="label"
            className={cn(
              "form-input__label block",
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
      <div className={cn("input-wrapper relative", inputWrapperClassName)}>
        <Input
          id={id}
          className={cn(
            "form-input__input",
            error && "border-error",
            (type === "password" || showCopyIcon) && "pr-10",
            disabled && "cursor-not-allowed opacity-50",
            getReadOnlyClassName(),
            inputClassName,
          )}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={inputValue}
          disabled={disabled}
          aria-disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly}
          {...restInputProps}
        />
        {type === "password" && (
          <Button
            className={cn(
              "absolute right-3 top-[18px] -translate-y-1/2 px-0",
              "text-text-muted-foreground hover:bg-transparent focus:outline-none",
              "transition-colors duration-200",
              disabled && "cursor-not-allowed opacity-50",
              getReadOnlyClassName(),
            )}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            type="button"
            variant="ghost"
            disabled={disabled}
            aria-disabled={disabled}
            aria-readonly={readOnly}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        )}
        {showCopyIcon && !type && (
          <Button
            className={cn(
              "absolute right-3 top-[18px] -translate-y-1/2 px-0",
              "text-text-muted-foreground hover:bg-transparent focus:outline-none",
              "transition-colors duration-200",
            )}
            onClick={handleCopy}
            tabIndex={-1}
            type="button"
            variant="ghost"
            disabled={disabled}
            aria-disabled={disabled}
            aria-label="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
        {error && (
          <Text variant="error" className="form-input__error text-left mt-1">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormInput, _.isEqual);
export type { IFormInputProps };
