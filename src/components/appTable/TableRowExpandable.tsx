import { isEqual } from "lodash";
import { memo } from "react";

// ========== External Dependencies ==========
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@designSystem/components/table";

// ========== Internal Dependencies ==========
import { ITableRowExpandableProps } from "@/shared/types";
import { cn } from "@/shared/utils";

/**
 * Helper function to determine column width class
 * @param width - Width value from column definition
 * @returns Tailwind width class
 */
const getWidthClass = (width: string | number | undefined): string => {
  if (!width) return "w-auto";
  return typeof width === "number" ? `w-[${width}px]` : `w-[${width}]`;
};

/**
 * TableRowExpandable Component
 * Renders an expandable table row with customizable columns and data
 *
 * @features
 * - Customizable column widths
 * - Custom cell rendering
 * - Hover effects
 * - Truncated content
 * - Responsive design
 */
function TableRowExpandable<T>({ data, columns, className }: ITableRowExpandableProps<T>) {
  // ========== Guard Clauses ==========
  if (!data?.length) return null;

  // ========== Render Methods ==========
  /**
   * Renders table header with column titles
   */
  const renderHeader = () => (
    <TableHeader className="border-b text-text-tertiary">
      <TableRow>
        {columns.map(column => (
          <TableHead
            key={String(column.key)}
            className={cn("overflow-hidden", getWidthClass(column.width), column.className)}
            style={{ width: column.width }}
          >
            <div className="truncate">{column.title}</div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );

  /**
   * Renders table body with data rows
   */
  const renderBody = () => (
    <TableBody>
      {data.map((item, index) => (
        <TableRow key={index} className="hover:bg-secondary/50">
          {columns.map(column => (
            <TableCell
              key={String(column.key)}
              className={cn("h-[60px] overflow-hidden px-3", getWidthClass(column.width), column.className)}
              style={{ width: column.width }}
            >
              <div className="truncate">{renderCellContent(item, column)}</div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  /**
   * Renders cell content based on column configuration
   */
  const renderCellContent = (item: T, column: ITableRowExpandableProps<T>["columns"][0]) => {
    const value = (item as Record<string, any>)[column.key];
    return column.render ? column.render(value, item) : String(value || "-");
  };

  // ========== Main Render ==========
  return (
    <div className="border rounded-lg w-full overflow-auto">
      <Table className={cn("bg-white rounded-lg shadow-md w-full table-fixed", className)}>
        {renderHeader()}
        {renderBody()}
      </Table>
    </div>
  );
}

export default memo(TableRowExpandable, isEqual);
