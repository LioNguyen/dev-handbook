import { ReactNode } from "react";

interface IFormBase {
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  tooltip?: ReactNode;
  value?: any;
}

interface ISelectOption {
  label: string;
  value: any;
}

export type { IFormBase, ISelectOption };
