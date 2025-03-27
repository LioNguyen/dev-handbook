import _ from "lodash";
import { HelpCircle } from "lucide-react";
import { type ChangeEvent, type ComponentPropsWithRef, type FC, memo, useEffect, useState } from "react";

import { AppPopover } from "@/components/appPopover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { IFormBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Text } from "@designSystem/components/text";
import { Textarea } from "@designSystem/components/textarea";

interface IFormTextareaProps extends IFormBase {
  inputDelay?: number;
  textareaProps?: Omit<ComponentPropsWithRef<typeof Textarea>, "id" | "onChange" | "placeholder" | "value">;
  textAreaWrapperClassName?: string;
  labelClassName?: string;
}

const FormTextarea: FC<IFormTextareaProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  inputDelay,
  label,
  labelClassName,
  textAreaWrapperClassName,
  textareaProps,
  onChange,
  placeholder,
  required,
  tooltip,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const debounceValue = useDebounce(inputValue, inputDelay ?? 400);

  const { className: textareaClassName, ...restTextareaProps } = textareaProps || {};

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";
    return "cursor-not-allowed pointer-events-none";
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  useEffect(() => {
    onChange?.(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div data-testid="form-textarea-test" className={cn("form-textarea", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            data-testid="text-label"
            as="label"
            variant="label"
            className={cn(
              "form-textarea__label block",
              disabled && "text-text-muted-foreground cursor-not-allowed",
              getReadOnlyClassName(),
              labelClassName,
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
      <div className={cn("textarea-wrapper relative", textAreaWrapperClassName)}>
        <Textarea
          id={id}
          className={cn(
            "form-textarea__input",
            error && "border-error",
            disabled && "cursor-not-allowed opacity-50",
            getReadOnlyClassName(),
            textareaClassName,
          )}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          aria-disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly}
          {...restTextareaProps}
        />
        {error && (
          <Text data-testid="text-error" variant="error" className="form-textarea__error text-left mt-1">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default memo(FormTextarea, _.isEqual);
export type { IFormTextareaProps };
