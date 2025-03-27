import { useCallback, useState } from "react";

// Base types
interface ISortDirection {
  id: string;
  desc: boolean;
  clear?: boolean;
}

interface ISortConfig {
  field: string;
  order: "asc" | "desc";
}

interface ISearchConfig {
  field: string;
  term: string;
}

interface iQueryFilters {
  [key: string]: string;
}

// Base query parameters that all tables should have
interface IBaseQueryParams {
  page: number;
  limit: number;
  search: ISearchConfig[];
  sort?: ISortConfig[];
  filters?: iQueryFilters;
}

// Table query parameters for internal use
interface IBaseTableQueryParams {
  page: number;
  limit: number;
  search?: ISearchConfig[];
  filters?: iQueryFilters;
}

// Hook options type with generic support
interface IUseTableOptions<T extends IBaseQueryParams> {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: ISearchConfig[];
  initialSort?: ISortConfig[];
  initialFilters?: iQueryFilters;
  initialParams?: Partial<T>;
}

function useTable<T extends IBaseQueryParams>(options: IUseTableOptions<T> = {}) {
  // States
  const [queryParams, setQueryParams] = useState<T>({
    page: options.initialPage ?? 1,
    limit: options.initialLimit ?? 10,
    search: options.initialSearch ?? [],
    sort: options.initialSort ?? [],
    filters: options.initialFilters ?? {},
    ...options.initialParams,
  } as T);

  const [sortState, setSortState] = useState<ISortDirection[]>([]);

  // Central update function with type support
  const updateQueryParams = useCallback((updates: Partial<T>) => {
    setQueryParams(prev => {
      const shouldResetPage = ["search" in updates, "limit" in updates, "sort" in updates, "filters" in updates].some(
        Boolean,
      );

      return {
        ...prev,
        ...updates,
        page: shouldResetPage ? 1 : updates.page ?? prev.page,
      };
    });
  }, []);

  // Handler for table query changes
  const handleQueryChange = useCallback(
    (params: Partial<IBaseTableQueryParams>) => {
      updateQueryParams({
        ...params,
      } as Partial<T>);
    },
    [updateQueryParams],
  );

  // Handler for searching
  const handleSearch = useCallback(
    (searchConfigs: ISearchConfig[]) => {
      updateQueryParams({
        search: searchConfigs,
      } as Partial<T>);
    },
    [updateQueryParams],
  );

  // Add/Update single search term
  const handleSearchTerm = useCallback(
    (field: string, term: string) => {
      const currentSearch = [...queryParams.search];
      const existingIndex = currentSearch.findIndex(s => s.field === field);

      if (existingIndex >= 0) {
        if (term) {
          currentSearch[existingIndex] = { field, term };
        } else {
          currentSearch.splice(existingIndex, 1);
        }
      } else if (term) {
        currentSearch.push({ field, term });
      }

      updateQueryParams({
        search: currentSearch,
      } as Partial<T>);
    },
    [queryParams.search, updateQueryParams],
  );

  // Clear search for a specific field
  const clearSearchField = useCallback(
    (field: string) => {
      const newSearch = queryParams.search.filter(s => s.field !== field);
      updateQueryParams({
        search: newSearch,
      } as Partial<T>);
    },
    [queryParams.search, updateQueryParams],
  );

  // Clear all search
  const clearAllSearch = useCallback(() => {
    updateQueryParams({
      search: [] as ISearchConfig[],
    } as Partial<T>);
  }, [updateQueryParams]);

  // Handler for sorting
  const handleSort = useCallback<(direction: ISortDirection | null) => void>(
    direction => {
      if (!direction) {
        // Clear all sorts
        setSortState([]);
        updateQueryParams({
          sort: [] as ISortConfig[],
        } as Partial<T>);
      } else if (direction.clear) {
        // Clear single sort
        const newSortState = sortState.filter(sort => sort.id !== direction.id);
        setSortState(newSortState);

        updateQueryParams({
          sort: newSortState.map(sort => ({
            field: sort.id,
            order: sort.desc ? "desc" : "asc",
          })) as ISortConfig[],
        } as Partial<T>);
      } else {
        // Update or add sort
        const newSortState = sortState.filter(sort => sort.id !== direction.id);
        newSortState.push(direction);
        setSortState(newSortState);

        updateQueryParams({
          sort: newSortState.map(sort => ({
            field: sort.id,
            order: sort.desc ? "desc" : "asc",
          })) as ISortConfig[],
        } as Partial<T>);
      }
    },
    [sortState, updateQueryParams],
  );

  // Handler for filter changes
  const handleFilterChange = useCallback(
    (name: string, values: string[]) => {
      const newFilters = { ...queryParams.filters };

      if (!values || values.length === 0) {
        delete newFilters[name];
      } else {
        newFilters[name] = values.join(",");
      }

      updateQueryParams({
        filters: newFilters,
      } as Partial<T>);
    },
    [queryParams.filters, updateQueryParams],
  );

  // Handler for date range filter changes
  const handleDateRangeFilterChange = useCallback(
    (dateRange: { start_at?: string; end_at?: string }) => {
      const newFilters = { ...queryParams.filters };

      // Update or remove start_at
      if (dateRange.start_at) {
        newFilters["start_at"] = dateRange.start_at;
      } else {
        delete newFilters["start_at"];
      }

      // Update or remove end_at
      if (dateRange.end_at) {
        newFilters["end_at"] = dateRange.end_at;
      } else {
        delete newFilters["end_at"];
      }

      updateQueryParams({
        filters: newFilters,
      } as Partial<T>);
    },
    [queryParams.filters, updateQueryParams],
  );

  // Handlers for Pagination
  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams({ page } as Partial<T>);
    },
    [updateQueryParams],
  );

  const handleLimitChange = useCallback(
    (limit: number) => {
      updateQueryParams({ limit } as Partial<T>);
    },
    [updateQueryParams],
  );

  // Reset function
  const resetQueryParams = useCallback(() => {
    setQueryParams({
      page: options.initialPage ?? 1,
      limit: options.initialLimit ?? 10,
      search: options.initialSearch ?? [],
      sort: options.initialSort ?? [],
      filters: options.initialFilters ?? {},
      ...options.initialParams,
    } as T);
    setSortState([]);
  }, [options]);

  return {
    // States
    queryParams,
    sortState,

    // Handlers
    handleQueryChange,
    handleSearch,
    handleSearchTerm,
    clearSearchField,
    clearAllSearch,
    handleSort,
    handleFilterChange,
    handleDateRangeFilterChange,
    handlePageChange,
    handleLimitChange,

    // Direct update methods
    updateQueryParams,
    resetQueryParams,
  };
}

export { useTable };
export type { IBaseTableQueryParams, ISortConfig, ISortDirection, ISearchConfig };
