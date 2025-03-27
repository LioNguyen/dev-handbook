import { ReactNode } from "react";

interface IComponentBase {
  className?: string;
  children?: ReactNode;
  onChange?: (value?: any) => void;
}

export type { IComponentBase };
