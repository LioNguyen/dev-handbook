import { HelpCircle } from "lucide-react";
import { ComponentPropsWithRef, type FC, useState } from "react";

import { AppPopover } from "@/components/appPopover";
import { IFormBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Checkbox } from "@designSystem/components/checkbox";
import { Text } from "@designSystem/components/text";

interface IFormCheckboxProps extends IFormBase {
  checkboxes?: string[];
  checkboxProps?: Omit<ComponentPropsWithRef<typeof Checkbox>, "id" | "onChange" | "checked">;
  checkboxWrapperClassName?: string;
  initialValues?: Record<string, boolean>;
}

const FormCheckbox: FC<IFormCheckboxProps> = ({
  className,
  disabled = false,
  readOnly = false,
  id,
  label,
  labelClassName,
  onChange,
  required,
  tooltip,
  checkboxes = [],
  checkboxProps,
  checkboxWrapperClassName,
  value = {},
  ...props
}) => {
  const [values, setValues] = useState<Record<string, boolean>>(() => {
    // Initialize with false or provided initial values
    return checkboxes.reduce(
      (acc, label) => ({
        ...acc,
        [label]: value[label] || false,
      }),
      {},
    );
  });

  const handleCheckboxChange = (label: string, checked: boolean) => {
    if (disabled) return;

    const newValues = {
      ...values,
      [label]: checked,
    };

    setValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div data-testid="form-checkbox-test" className={cn("form-checkbox", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2">
          <Text
            as="label"
            variant="label"
            className={cn(
              "form-checkbox__label block",
              labelClassName,
              disabled && "text-text-muted-foreground cursor-not-allowed",
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
      <div className={cn("checkbox-wrapper mt-2 space-y-2", checkboxWrapperClassName)}>
        {checkboxes.map(checkboxLabel => (
          <div key={checkboxLabel} className="flex items-center gap-2">
            <Checkbox
              id={`${id}-${checkboxLabel}`}
              checked={values[checkboxLabel]}
              onCheckedChange={checked => !readOnly && handleCheckboxChange(checkboxLabel, checked as boolean)}
              disabled={disabled}
              className={cn(checkboxProps?.className, disabled && "cursor-not-allowed opacity-50")}
              {...checkboxProps}
            />
            <Text
              as="label"
              variant="label"
              htmlFor={`${id}-${checkboxLabel}`}
              className={cn("cursor-pointer", disabled && "text-text-muted-foreground cursor-not-allowed")}
            >
              {checkboxLabel}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCheckbox;
export type { IFormCheckboxProps };
