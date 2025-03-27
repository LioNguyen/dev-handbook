import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@designSystem/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designSystem/components/dropdownMenu";

interface ColumnMeta {
  label?: string;
}

interface ITableViewOptionsProps<TData> {
  table: Table<TData>;
  className?: string;
}

const TableViewOptions = <TData,>({ table, className }: ITableViewOptionsProps<TData>) => {
  const { t } = useTranslation();

  const hideableColumns = table
    .getAllColumns()
    .filter(column => typeof column.accessorFn !== "undefined" && column.getCanHide());

  if (hideableColumns.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Settings2 className="h-4 w-4" />
          {t("table.view")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{t("table.toggle_columns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {hideableColumns.map(column => {
          const columnMeta = column.columnDef.meta as ColumnMeta | undefined;
          const columnLabel = columnMeta?.label ?? column.id;

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(!!value)}
            >
              {t(columnLabel)}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableViewOptions;
export type { ColumnMeta, ITableViewOptionsProps };
