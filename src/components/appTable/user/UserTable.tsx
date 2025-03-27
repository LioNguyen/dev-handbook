/* eslint-disable react-hooks/exhaustive-deps */
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { flow, get, map } from "lodash";
import { useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";

import { AppTable, IAppTableProps } from "@/components/appTable";
import { MODAL_NAME, SHEET_NAME, useGlobal } from "@/domains/global";
import { IUserItem, useUser } from "@/domains/user";
import { PATH, SCREEN_BREAKPOINTS } from "@/shared/constants";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useScreenSize } from "@/shared/hooks/useScreenSize";
import { parseNumericId } from "@/shared/utils";
import { getUserColumns } from "./userTableColumns";

interface IUserTableProps extends Partial<Omit<IAppTableProps<IUserItem>, "actions" | "columns" | "table">> {}

const UserTable: FC<IUserTableProps> = () => {
  // ============================================================================
  // States & Hooks
  // ============================================================================
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const { t } = useTranslation();

  const { navigate, params } = useAppLocation();
  const userId = flow(
    params => get(params, "id", undefined),
    id => id && parseNumericId(id),
  )(params);

  const { openModal, openSheet } = useGlobal();
  const { width } = useScreenSize();

  // User hooks
  const { useUserRoleOptions, useUserTable } = useUser();

  const {
    data,
    isLoading,
    queryParams,
    sortState,
    handleSearchTerm,
    handleSort,
    handleFilterChange,
    handlePageChange,
    handleLimitChange,
  } = useUserTable({});

  const {
    infiniteOptions: userRoleOptions,
    isLoading: isUserRoleLoading,
    hasMore: userRoleHasMore,
    handleLoadMore: userRoleHandleLoadMore,
    handleSearchTerm: userRoleHandleSearchTerm,
  } = useUserRoleOptions({});

  // ============================================================================
  // Helper Functions
  // ============================================================================
  /**
   * Calculates the width of table columns based on screen size
   * Adjusts for mobile view and accounts for sidebar, padding and other UI elements
   */
  const getColumnWidth = () => {
    if (width < SCREEN_BREAKPOINTS.MOBILE) {
      return 200;
    }
    return Math.floor((width - sidebarWidth - 64 - 2 - 50 * 2 - 15) / 5);
  };

  /**
   * Memoized table data to prevent unnecessary re-renders
   */
  const tableData = useMemo(() => {
    return data?.data?.items || [];
  }, [data]);

  // ============================================================================
  // Table Configuration
  // ============================================================================

  const columns = getUserColumns({
    columnWidth: getColumnWidth(),
    onUpdateUser: handleUserUpdate,
    sortState,
    onSort: handleSort,
  });

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // ============================================================================
  // Handler Functions
  // ============================================================================
  function resetRowsSelected() {
    table.toggleAllRowsSelected(false);
  }

  function handleUserCreate() {
    openSheet({
      name: SHEET_NAME.userForm,
      data: {
        onSuccess: resetRowsSelected,
      },
    });
  }

  function handleUserUpdate(item: IUserItem) {
    openSheet({
      name: SHEET_NAME.userForm,
      data: {
        id: item.id,
      },
    });
  }

  function handleUserMultiDelete() {
    openModal({
      name: MODAL_NAME.userDeleteConfirm,
      data: {
        items: map(table.getFilteredSelectedRowModel().rows, "original"),
        onSuccess: resetRowsSelected,
      },
    });
  }

  function onLimitChange(limit: number) {
    handleLimitChange(limit);
    resetRowsSelected();
  }

  function onPageChange(page: number) {
    handlePageChange(page);
    resetRowsSelected();
  }

  // ============================================================================
  // Effects
  // ============================================================================
  // Update sidebar width when screen size changes
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      setSidebarWidth(sidebar.offsetWidth);
    }
  }, [width]);

  // Handle user detail view when userId is present in URL
  useEffect(() => {
    if (userId) {
      openSheet({
        name: SHEET_NAME.userReview,
        data: {
          id: userId,
        },
      });
    } else {
      navigate(PATH.users);
    }
  }, [userId]);

  // This make react router dom sync with window location
  useEffect(() => {
    navigate(window.location.pathname);
  }, [window.location.pathname]);

  // ============================================================================
  // Render
  // ============================================================================
  return (
    <AppTable
      loading={isLoading}
      table={table}
      columns={columns}
      actions={{
        enabled: true,
        onCreate: handleUserCreate,
        onDelete: handleUserMultiDelete,
      }}
      searchable={{
        enabled: true,
        column: "email",
        placeholder: t("table.placeholder_filter_name", { ns: "user" }),
        onChange: handleSearchTerm,
      }}
      filterable={[
        {
          name: "role",
          options: userRoleOptions,
          label: t("table.label_filter_role", { ns: "user" }),
          placeholder: t("table.label_filter_role", { ns: "user" }),
          onChange: handleFilterChange,
          enabled: true,
          loading: isUserRoleLoading,
          hasMore: userRoleHasMore,
          onLoadMore: userRoleHandleLoadMore,
          onSearch: term => userRoleHandleSearchTerm("role", term),
        },
      ]}
      pagination={{
        limit: queryParams.limit || 10,
        page: queryParams.page || 1,
        totalPages: data?.data?.totalPages || 0,
        onLimitChange,
        onPageChange,
      }}
    />
  );
};

export default UserTable;
export type { IUserTableProps };
