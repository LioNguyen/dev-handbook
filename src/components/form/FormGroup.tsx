import _ from "lodash";
import { memo } from "react";

import {
  FormDatePicker,
  FormInput,
  FormTextarea,
  IFormDatePickerProps,
  IFormInputProps,
  IFormTextareaProps,
} from "@/components/form";
import FormCheckbox, { IFormCheckboxProps } from "./input/FormCheckbox";
import FormInputIp, { IFormInputIpProps } from "./input/FormInputIp";
import FormInputMac, { IFormInputMacProps } from "./input/FormInputMac";
import FormRangeSlider, { IFormRangeSliderProps } from "./input/FormRangeSlider";
import FormSwitch, { IFormSwitchProps } from "./input/FormSwitch";
import FormSelect, { IFormSelectProps } from "./select/FormSelect";

const FORM_TYPES = {
  checkbox: "checkbox",
  input: "input",
  select: "select",
  textarea: "textarea",
  datePicker: "datePicker",
  range: "range",
  switch: "switch",
  mac: "mac",
  ip: "ip",
} as const;

type IFormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];

// Map form type with related props
type IFormTypeProps = {
  checkbox: Omit<IFormCheckboxProps, "label" | "id">;
  input: Omit<IFormInputProps, "label" | "id">;
  select: Omit<IFormSelectProps, "label" | "id">;
  textarea: Omit<IFormTextareaProps, "label" | "id">;
  datePicker: Omit<IFormDatePickerProps, "label" | "id">;
  range: Omit<IFormRangeSliderProps, "label" | "id">;
  switch: Omit<IFormSwitchProps, "label" | "id">;
  mac: Omit<IFormInputMacProps, "label" | "id">;
  ip: Omit<IFormInputIpProps, "label" | "id">;
};

interface IFieldBase {
  name: string;
  label?: string;
}

type IFormField<T extends IFormType> = IFieldBase & {
  type: T;
  data: IFormTypeProps[T];
};

interface IFormGroupProps<T extends IFormType> {
  id: string;
  formFields: IFormField<T>[];
}

function isCheckboxField(field: IFormField<IFormType>): field is IFormField<"checkbox"> {
  return field.type === "checkbox";
}

function isInputField(field: IFormField<IFormType>): field is IFormField<"input"> {
  return field.type === "input";
}

function isSelectField(field: IFormField<IFormType>): field is IFormField<"select"> {
  return field.type === "select";
}

function isTextareaField(field: IFormField<IFormType>): field is IFormField<"textarea"> {
  return field.type === "textarea";
}

function isDatePickerField(field: IFormField<IFormType>): field is IFormField<"datePicker"> {
  return field.type === "datePicker";
}

function isRangeSliderField(field: IFormField<IFormType>): field is IFormField<"range"> {
  return field.type === "range";
}

function isSwitchField(field: IFormField<IFormType>): field is IFormField<"switch"> {
  return field.type === "switch";
}

function isMacField(field: IFormField<IFormType>): field is IFormField<"mac"> {
  return field.type === "mac";
}

function isIpField(field: IFormField<IFormType>): field is IFormField<"ip"> {
  return field.type === "ip";
}

function FormGroup<T extends IFormType>({ id, formFields }: IFormGroupProps<T>) {
  const renderField = (field: IFormField<T>) => {
    const { label, name, data } = field;
    const fieldId = `${id}-${name}`;

    if (isCheckboxField(field)) {
      return <FormCheckbox key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isInputField(field)) {
      return <FormInput key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isSelectField(field)) {
      return <FormSelect key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isTextareaField(field)) {
      return <FormTextarea key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isDatePickerField(field)) {
      return <FormDatePicker key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isRangeSliderField(field)) {
      return <FormRangeSlider key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isSwitchField(field)) {
      return <FormSwitch key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isMacField(field)) {
      return <FormInputMac key={fieldId} id={fieldId} label={label} {...data} />;
    }

    if (isIpField(field)) {
      return <FormInputIp key={fieldId} id={fieldId} label={label} {...data} />;
    }

    return <></>;
  };

  if (_.isEmpty(formFields)) {
    return null;
  }

  return <>{formFields.map(renderField)}</>;
}

export default memo(FormGroup, _.isEqual) as typeof FormGroup;
export { FORM_TYPES };
export type { IFormField, IFormType, IFormTypeProps };
