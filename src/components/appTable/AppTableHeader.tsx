// ========== External Dependencies ==========
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// ========== Internal Dependencies ==========
import { ISortDirection } from "@/shared/hooks/useTable";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designSystem/components/dropdownMenu";
import { Text } from "@designSystem/components/text";

// ========== Types ==========
interface IAppTableHeaderProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  className?: string;
  width?: number;
  sortDirection?: ISortDirection;
  onSort?: (direction: ISortDirection | null) => void;
}

/**
 * AppTableHeader Component
 * Renders a table header cell with sorting capabilities and column visibility toggle
 *
 * @features
 * - Sortable columns (ascending/descending)
 * - Clear sort functionality
 * - Column visibility toggle
 * - Dropdown menu for actions
 */
function AppTableHeader<TData, TValue>({
  column,
  title,
  className,
  sortDirection,
  onSort,
  width,
}: IAppTableHeaderProps<TData, TValue>) {
  // ========== Hooks ==========
  const { t } = useTranslation();

  // ========== Computed Values ==========
  /**
   * Get current sort direction for the column
   */
  const currentSort = (() => {
    if (!sortDirection || !column || sortDirection.id !== column.id) return null;
    return sortDirection.desc ? "desc" : "asc";
  })();

  /**
   * Get width styles for the header
   */
  const widthStyles = width
    ? {
        width: `${width}px`,
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
      }
    : undefined;

  // ========== Event Handlers ==========
  /**
   * Handle sort direction change
   */
  const handleSort = useCallback(
    (desc: boolean) => {
      if (!column || !onSort) return;
      onSort({
        id: column.id,
        desc,
      });
    },
    [column, onSort],
  );

  /**
   * Handle clearing sort
   */
  const handleClearSort = useCallback(() => {
    if (!column || !onSort || !sortDirection) return;
    onSort({
      id: column.id,
      desc: sortDirection.desc,
      clear: true,
    });
  }, [column, onSort, sortDirection]);

  // ========== Render Methods ==========
  /**
   * Render sort icon based on current sort direction
   */
  const renderSortIcon = () => {
    if (currentSort === "desc") return <ArrowDown className="h-4 w-4" />;
    if (currentSort === "asc") return <ArrowUp className="h-4 w-4" />;
    return <ChevronsUpDown className="h-4 w-4 text-text-tertiary/70" />;
  };

  /**
   * Render basic header without sort functionality
   */
  const renderBasicHeader = () => (
    <Text variant="label" className={cn("truncate", className)} style={widthStyles}>
      {title}
    </Text>
  );

  /**
   * Render dropdown menu content
   */
  const renderDropdownContent = () => (
    <DropdownMenuContent align="start" className="w-fit">
      <DropdownMenuItem
        onClick={() => handleSort(false)}
        className={cn("flex items-center gap-2", currentSort === "asc" && "bg-accent")}
      >
        <ArrowUp className="h-3.5 w-3.5 text-text-tertiary/70" />
        {t("table.sort.ascending")}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => handleSort(true)}
        className={cn("flex items-center gap-2", currentSort === "desc" && "bg-accent")}
      >
        <ArrowDown className="h-3.5 w-3.5 text-text-tertiary/70" />
        {t("table.sort.descending")}
      </DropdownMenuItem>

      {currentSort && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClearSort} className="flex items-center gap-2">
            <X className="h-3.5 w-3.5 text-text-tertiary/70" />
            {t("table.sort.clear")}
          </DropdownMenuItem>
        </>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => column?.toggleVisibility(false)} className="flex items-center gap-2">
        <EyeOff className="h-3.5 w-3.5 text-text-tertiary/70" />
        {t("table.column.hide")}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  // ========== Main Render ==========
  // Return basic header if sorting is not enabled
  if (!onSort || !column) {
    return renderBasicHeader();
  }

  return (
    <div className={cn("flex items-center space-x-2 text-text-tertiary", className)} style={widthStyles}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-0 py-2 hover:bg-transparent data-[state=open]:bg-accent">
            <Text variant="label" className="truncate">
              {title}
            </Text>
            <div className="h-4 w-4 shrink-0">{renderSortIcon()}</div>
          </Button>
        </DropdownMenuTrigger>
        {renderDropdownContent()}
      </DropdownMenu>
    </div>
  );
}

export default AppTableHeader;
export type { IAppTableHeaderProps, ISortDirection };
