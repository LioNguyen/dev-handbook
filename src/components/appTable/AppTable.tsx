/* eslint-disable react-hooks/exhaustive-deps */
// ========== External Imports ==========
import { flexRender } from "@tanstack/react-table";
import { CirclePlus, Trash2 } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ========== Internal Components ==========
import { EmptyState } from "@/components/appState";
import {
  TableDateRangePickerFilter,
  TableFilter,
  TablePagination,
  TableRowExpandable,
  TableSkeleton,
  TableViewOptions,
} from "@/components/appTable";
import { SearchBox } from "@/components/common";
import { Button } from "@designSystem/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@designSystem/components/table";

// ========== Utils & Types ==========
import { IAppTable, IColumnMeta, ITableData } from "@/shared/types";
import { cn } from "@/shared/utils";

interface IAppTableProps<TData extends ITableData> extends IAppTable<TData> {}

/**
 * Advanced table component with features like:
 * - Expandable rows with animations
 * - Search and filtering
 * - Pagination
 * - Column customization
 * - Row selection
 * - Scroll synchronization
 * - Empty states
 */
function AppTable<TData extends ITableData>({
  table,
  columns,
  searchable,
  filterable,
  actions = { enabled: true },
  pagination,
  className,
  loading,
  emptyState,
  expandableProps,
  onDateRangeFilter,
  onRowClick,
}: IAppTableProps<TData>) {
  // ========== Hooks & States ==========
  const { t } = useTranslation();

  // UI States
  const [hasScrollbar, setHasScrollbar] = useState(false);

  // Expansion Animation States
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [closingRows, setClosingRows] = useState<Record<string, boolean>>({});
  const [mountingRows, setMountingRows] = useState<Record<string, boolean>>({});

  // ========== Refs ==========
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rowExpandableRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ========== Utility Functions ==========
  /**
   * Validates if data can be used to generate default columns
   */
  const isValidFieldsData = (data: any): boolean => {
    return Array.isArray(data) && data.length > 0 && typeof data[0] === "object";
  };

  /**
   * Generates default columns from data structure
   */
  const generateDefaultColumns = (fieldsData: any[]) => {
    if (!isValidFieldsData(fieldsData)) return [];

    const firstItem = fieldsData[0];
    return Object.keys(firstItem).map(key => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      render: (value: any) => value ?? "-",
    }));
  };

  /**
   * Returns column style based on meta information
   */
  const getColumnStyle = (column: any) => {
    const meta = column.columnDef?.meta as IColumnMeta;
    return {
      width: meta?.width ? `${meta.width}px` : "auto",
      minWidth: meta?.width ? `${meta.width}px` : undefined,
      maxWidth: meta?.width ? `${meta.width}px` : undefined,
    };
  };

  // ========== Effects ==========
  /**
   * Handles row expansion state reset on data change
   */
  useEffect(() => {
    if (Object.keys(expandedRows).length > 0) {
      setClosingRows(() => {
        const newState: Record<string, boolean> = {};
        Object.keys(expandedRows).forEach(rowId => {
          newState[rowId] = true;
        });
        return newState;
      });

      setTimeout(() => {
        setExpandedRows({});
        setClosingRows({});
        setMountingRows({});
      }, 300);
    }
  }, [table.getCoreRowModel().rows]);

  /**
   * Synchronizes header and body scroll positions
   */
  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!header || !body) return;

    const handleScroll = () => {
      header.scrollLeft = body.scrollLeft;
    };

    body.addEventListener("scroll", handleScroll);
    return () => body.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Detects vertical scrollbar presence
   */
  useEffect(() => {
    const bodyElement = bodyRef.current;
    if (!bodyElement) return;

    const checkForScrollbar = () => {
      setHasScrollbar(bodyElement.scrollHeight > bodyElement.clientHeight);
    };

    const resizeObserver = new ResizeObserver(checkForScrollbar);
    resizeObserver.observe(bodyElement);
    return () => resizeObserver.disconnect();
  }, []);

  // ========== Event Handlers ==========
  /**
   * Handles row click with expansion animation
   */
  const handleRowClick = (rowId: string | number) => {
    if (!expandableProps) {
      onRowClick?.(table.getRow(String(rowId)));
      return;
    }

    if (expandedRows[rowId]) {
      // Close animation
      setClosingRows(prev => ({ ...prev, [rowId]: true }));
      setTimeout(() => {
        setExpandedRows(prev => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
        setClosingRows(prev => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
      }, 300);
    } else {
      // Open animation
      setExpandedRows(prev => ({ ...prev, [rowId]: true }));
      setMountingRows(prev => ({ ...prev, [rowId]: true }));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMountingRows(prev => {
            const newState = { ...prev };
            delete newState[rowId];
            return newState;
          });
        });
      });
    }
  };

  // ========== Render Methods ==========
  /**
   * Renders table controls (search, filters, actions)
   */
  const renderControls = () => {
    if (!(searchable?.enabled || hasFilters || actions.enabled)) return null;

    return (
      <div className="app-table__controls py-4 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side controls */}
        <div className="flex flex-wrap gap-2">
          {searchable?.enabled && (
            <SearchBox
              className="h-8 max-w-sm"
              placeholder={searchable.placeholder || t("common.search")}
              onChange={value => searchable?.onChange?.(searchable.column, value)}
            />
          )}
          <div className="flex flex-wrap gap-2">
            {filterable?.map(
              (filter, index) =>
                filter.enabled !== false && (
                  <TableFilter
                    key={`${filter.name}-${index}`}
                    {...filter}
                    placeholder={filter.placeholder || filter.name}
                  />
                ),
            )}
            {onDateRangeFilter && <TableDateRangePickerFilter onChange={onDateRangeFilter} />}
          </div>
        </div>

        {/* Right side actions */}
        {actions.enabled && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            {hasSelectedRows && actions.onDelete && (
              <div className={cn("animate-in fade-in slide-in-from-right-5", "rounded-md")}>
                <Button variant="destructive" size="sm" className="h-8" onClick={actions.onDelete}>
                  <Trash2 className="h-4 w-4" />
                  {t("table.delete_multi", { count: selectedRows.length })}
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              {actions.onCreate && (
                <Button className="h-8" onClick={actions.onCreate}>
                  <CirclePlus className="h-4 w-4" />
                  {t("table.new")}
                </Button>
              )}
              {actions.customActions}
              <TableViewOptions table={table} />
            </div>
          </div>
        )}
      </div>
    );
  };

  /**
   * Renders table header with sticky positioning and scroll sync
   */
  const renderTableHeader = () => (
    <div
      ref={headerRef}
      className={cn("sticky top-0 z-50 bg-white rounded-t-md overflow-hidden", hasScrollbar && "pr-3")}
    >
      <div className="w-fit min-w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    style={{
                      ...getColumnStyle(header.column),
                      overflow: "hidden",
                    }}
                    className={cn(
                      "px-3 h-10 bg-white",
                      index === 0 && "rounded-tl-md",
                      index === headerGroup.headers.length - 1 && "rounded-tr-md",
                    )}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>
    </div>
  );

  /**
   * Renders table body with loading, empty states and expandable rows
   */
  /**
   * Renders table body with conditional states (loading, empty, data)
   */
  const renderTableBody = () => (
    <div ref={bodyRef} className="max-h-[calc(100vh-350px)] overflow-auto overflow-overlay custom-scrollbar">
      <div className="w-fit min-w-full">
        <Table>
          <TableBody>
            {/* Loading State */}
            {loading && <TableSkeleton columns={columns.length} />}

            {/* Data State */}
            {!loading &&
              table.getCoreRowModel().rows?.length > 0 &&
              table.getCoreRowModel().rows.map(row => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      expandableProps && "cursor-pointer hover:bg-secondary/50",
                      "transition-colors duration-200",
                    )}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} style={getColumnStyle(cell.column)} className="px-3 text-left">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {renderExpandableRow(row)}
                </Fragment>
              ))}

            {/* Empty State */}
            {!loading && !table.getCoreRowModel().rows?.length && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState || <EmptyState description={t("table.no_results")} />}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  /**
   * Renders expandable row content with animation
   */
  const renderExpandableRow = (row: any) => {
    const expandableRows = expandableProps ? row.original?.[expandableProps?.dataKey] : [];
    const expandableRowsMaxHeight = expandableRows?.length * 60 + 60 + 16 * 2;

    if (
      !(expandedRows[row.id] || closingRows[row.id]) ||
      !expandableProps ||
      !row.original?.[expandableProps.dataKey]
    ) {
      return null;
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="p-0">
          <div
            className={cn(
              "transform-gpu overflow-hidden",
              "transition-[max-height,opacity,transform] duration-300 ease-in-out",
              "will-change-[transform,max-height,opacity]",
              mountingRows[row.id] && "max-h-0 opacity-0 scale-95",
              expandedRows[row.id] &&
                !closingRows[row.id] &&
                !mountingRows[row.id] &&
                `max-h-[${expandableRowsMaxHeight}px] opacity-100 scale-100`,
              closingRows[row.id] && "max-h-0 opacity-0 scale-95",
            )}
          >
            <div
              ref={el => (rowExpandableRefs.current[row.id] = el)}
              className="py-4 px-6 bg-secondary/30 transform-gpu origin-top transition-transform duration-300 ease-in-out"
            >
              <TableRowExpandable
                {...expandableProps}
                data={row.original?.[expandableProps.dataKey]}
                columns={
                  expandableProps?.getColumns
                    ? expandableProps.getColumns(row.original[expandableProps.dataKey], row.original)
                    : generateDefaultColumns(row.original[expandableProps.dataKey])
                }
              />
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  // ========== Computed Values ==========
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelectedRows = selectedRows.length > 0;
  const hasFilters = filterable?.some(filter => filter.enabled !== false);

  // ========== Main Render ==========
  return (
    <div className={cn("app-table flex flex-col gap-2", className)}>
      {renderControls()}

      <div className="app-table__content rounded-md border relative">
        {renderTableHeader()}
        {renderTableBody()}
      </div>

      {/* Pagination */}
      {!!table.getCoreRowModel().rows?.length && (
        <TablePagination
          {...pagination}
          selectedItems={table.getFilteredSelectedRowModel().rows.length}
          totalItems={table.getFilteredRowModel().rows.length}
        />
      )}
    </div>
  );
}

export default AppTable;
export type { IAppTableProps };
