// ========== External Dependencies ==========
import { isEqual } from "lodash";
import { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

// ========== Internal Dependencies ==========
import { PAGE_SIZE } from "@/shared/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@designSystem/components/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@designSystem/components/select";
import { Text } from "@designSystem/components/text";

// ========== Types ==========
interface ITablePaginationProps {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  selectedItems?: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

/**
 * TablePagination Component
 * Renders a pagination control with page size selection and navigation
 *
 * @features
 * - Dynamic page number generation
 * - Page size selection
 * - Previous/Next navigation
 * - Selected items counter
 * - Responsive layout
 */
const TablePagination: FC<ITablePaginationProps> = ({
  page,
  limit,
  totalPages,
  totalItems,
  selectedItems,
  onPageChange,
  onLimitChange,
}) => {
  // ========== Hooks ==========
  const { t } = useTranslation();

  // ========== Helper Functions ==========
  /**
   * Generate pagination items array
   * Returns array of numbers and "ellipsis" markers
   */
  const getPaginationItems = (): (number | "ellipsis")[] => {
    const items: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      items.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      // Complex pagination logic for more than 7 pages
      items.push(1);

      if (page > 3) {
        items.push("ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (page < totalPages - 2) {
        items.push("ellipsis");
      }

      items.push(totalPages);
    }

    return items;
  };

  // ========== Render Methods ==========
  /**
   * Render items counter section
   */
  const itemsCounter = useMemo(() => {
    if (!selectedItems) {
      return <></>;
    }

    return (
      <Text variant="description">
        {selectedItems !== undefined
          ? t("table.selected_count", { selected: selectedItems, total: totalItems })
          : t("table.total_items", { total: totalItems })}
      </Text>
    );
  }, [selectedItems, totalItems, t]);

  /**
   * Render page size selector
   */
  const pageSizeSelector = useMemo(() => {
    return (
      <div className="flex items-center space-x-2">
        <Text variant="label" className="w-fit">
          {t("table.rows_per_page")}
        </Text>
        <Select value={String(limit)} onValueChange={value => onLimitChange(Number(value))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGE_SIZE.map(pageSize => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }, [limit, onLimitChange, t]);

  /**
   * Render previous button
   */
  const renderPreviousButton = () => (
    <PaginationItem>
      <PaginationPrevious
        className={page <= 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        onClick={() => {
          if (page <= 1) return;
          onPageChange(page - 1);
        }}
      />
    </PaginationItem>
  );

  /**
   * Render next button
   */
  const renderNextButton = () => (
    <PaginationItem>
      <PaginationNext
        className={page >= totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        onClick={() => {
          if (page >= totalPages) return;
          onPageChange(page + 1);
        }}
      />
    </PaginationItem>
  );

  /**
   * Render pagination items (numbers and ellipsis)
   */
  const renderPaginationItems = () => {
    return getPaginationItems().map((item, index) => (
      <PaginationItem key={index}>
        {item === "ellipsis" ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink className="cursor-pointer" isActive={page === item} onClick={() => onPageChange(item)}>
            {item}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  // ========== Main Render ==========
  return (
    <div className="table-pagination px-2 py-4 gap-6 flex flex-col items-center lg:flex-row">
      {itemsCounter}
      {pageSizeSelector}

      <Pagination className="m-0 w-fit">
        <PaginationContent>
          {renderPreviousButton()}
          {renderPaginationItems()}
          {renderNextButton()}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default memo(TablePagination, isEqual);
export type { ITablePaginationProps };
