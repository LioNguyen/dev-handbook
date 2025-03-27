import { ColumnDef, Table as ReactTable, Row } from "@tanstack/react-table";
import { ReactNode } from "react";

import { IComponentBase } from "@/shared/types/component";

interface FilterOption {
  label: string;
  value: string;
}

interface ITableFilter extends Omit<IComponentBase, "onChange"> {
  name: string;
  options: FilterOption[];
  label?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (name: string, value: string[]) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  onSearch?: (searchTerm: string) => void;
  searchDebounce?: number;
  numberBadgesToShow?: number;
}

interface IDateFilter {
  start_at?: string;
  end_at?: string;
}

interface IField {
  name: string;
  key: string;
  type: string;
  required: boolean;
  defaultData?: string;
  description?: string;
}

interface ITableData {
  id: string | number;
  [key: string]: any;
}

interface IColumnMeta {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface ISearchableConfig {
  enabled?: boolean;
  placeholder?: string;
  column: string;
  onChange?: (field: string, term: string) => void;
}

interface IFilterConfig extends ITableFilter {
  enabled?: boolean;
}

interface IActionConfig {
  enabled?: boolean;
  onCreate?: () => void;
  onDelete?: () => void;
  customActions?: ReactNode;
}

interface IPaginationConfig {
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

interface ITableQueryParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string>;
}

interface ITableRowExpandableColumn<T = any> {
  key: string;
  title: string | JSX.Element;
  width?: string | number;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface IExpandableConfig<T = any> {
  dataKey: string;
  getColumns?: (columnData: T[], rowData: any) => ITableRowExpandableColumn<T>[];
}

interface ITableRowExpandableProps<T = any> {
  data: T[];
  columns: ITableRowExpandableColumn<T>[];
  className?: string;
}

interface IAppTable<TData extends ITableData> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, any>[];
  searchable?: ISearchableConfig;
  filterable?: IFilterConfig[];
  actions?: IActionConfig;
  pagination: IPaginationConfig;
  className?: string;
  loading?: boolean;
  emptyState?: ReactNode;
  expandable?: boolean;
  expandableProps?: IExpandableConfig<any>;
  onDateRangeFilter?: (date: IDateFilter) => void;
  onRowClick?: (row: Row<TData>) => void;
}

export type {
  IActionConfig,
  IAppTable,
  IColumnMeta,
  IExpandableConfig,
  IField,
  IFilterConfig,
  IPaginationConfig,
  ISearchableConfig,
  ITableData,
  ITableFilter,
  ITableQueryParams,
  ITableRowExpandableColumn,
  ITableRowExpandableProps,
};
