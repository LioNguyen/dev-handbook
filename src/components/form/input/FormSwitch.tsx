import { HelpCircle } from "lucide-react";
import { ComponentPropsWithRef, type FC, useEffect, useState } from "react";

import { AppPopover } from "@/components/appPopover";
import { IFormBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Switch } from "@designSystem/components/switch";
import { Text } from "@designSystem/components/text";

interface IFormSwitchProps extends IFormBase {
  switchLabel?: string;
  switchProps?: Omit<ComponentPropsWithRef<typeof Switch>, "id" | "onChange" | "checked">;
  switchWrapperClassName?: string;
}

const FormSwitch: FC<IFormSwitchProps> = ({
  className,
  disabled = false,
  readOnly = false,
  id,
  label,
  labelClassName,
  onChange,
  required,
  tooltip,
  value = false,
  switchLabel,
  switchProps,
  switchWrapperClassName,
  ...props
}) => {
  const [checked, setChecked] = useState(value);

  const getReadOnlyClassName = () => {
    if (!readOnly) return "";

    return "cursor-not-allowed pointer-events-none";
  };

  const handleSwitchChange = (newChecked: boolean) => {
    if (disabled) return;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  const handleLabelClick = () => {
    if (disabled) return;
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div data-testid="form-switch-test" className={cn("form-switch", className)} {...props}>
      {label && (
        <div className="flex items-center gap-2 cursor-pointer">
          <Text
            as="label"
            variant="label"
            className={cn(
              "form-switch__label block",
              labelClassName,
              disabled && "text-text-muted-foreground cursor-not-allowed",
              getReadOnlyClassName(),
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
      <div className={cn("switch-wrapper flex items-center gap-2", switchWrapperClassName)}>
        <Switch
          id={id}
          className={cn(
            "form-switch__input",
            switchProps?.className,
            disabled && "cursor-not-allowed opacity-50",
            getReadOnlyClassName(),
          )}
          checked={checked}
          onCheckedChange={checked => handleSwitchChange(checked)}
          disabled={disabled}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          {...switchProps}
        />
        <Text
          className={cn("w-fit", disabled && "text-text-muted-foreground cursor-not-allowed", getReadOnlyClassName())}
          as="label"
          variant="label"
          onClick={handleLabelClick}
        >
          {switchLabel}
        </Text>
      </div>
    </div>
  );
};

export default FormSwitch;
export type { IFormSwitchProps };
