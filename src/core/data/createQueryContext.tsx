/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from "lodash";
import { createContext, useContext, useMemo, useReducer } from "react";

import { QueryActions } from "./queryActions";
import { createInitialState, queryReducer } from "./queryReducer";
import { BaseEntity, QueryContextValue, QueryProviderProps, QueryState } from "./queryTypes";

/**
 * Factory function that creates a typed context for managing resource data
 * @returns Object with QueryProvider and useQuery hook
 */
export function createQueryContext<T extends BaseEntity>() {
  // Create a typed context - undefined by default until Provider is used
  const QueryContext = createContext<QueryContextValue<T> | undefined>(undefined);

  /**
   * Provider component that makes query state available to children
   */
  function QueryProvider({ endpoint, initialState = {}, children }: QueryProviderProps<T>) {
    // Create state by merging default with any overrides
    const defaultState = createInitialState<T>();
    const mergedState = merge({}, defaultState, initialState) as QueryState<T>;

    // Set up reducer with initial state
    const [state, dispatch] = useReducer(queryReducer<T>, mergedState);

    // Create actions instance for API operations
    const actionsInstance = useMemo(() => new QueryActions<T>(endpoint), [endpoint]);

    // Create memoized action handlers bound to the current dispatch
    // This prevents unnecessary re-renders of children using these functions
    const actions = useMemo(() => {
      return {
        // Fetch all resources with optional filtering
        fetchAll: (params?: Record<string, any>) => actionsInstance.fetchAll(dispatch, params),

        // Fetch a single resource by ID
        fetchById: (id: string | number) => actionsInstance.fetchById(id, dispatch),

        // Create a new resource
        create: (item: Omit<T, "id">) => actionsInstance.create(item, dispatch),

        // Update an existing resource
        update: (id: string | number, item: Partial<T>) => actionsInstance.update(id, item, dispatch),

        // Delete a resource
        remove: (id: string | number) => actionsInstance.remove(id, dispatch),

        // Select a resource for editing/viewing
        select: (item: T | null) => actionsInstance.select(item, dispatch),

        // Clear any error state
        clearError: () => actionsInstance.clearError(dispatch),

        // Reset state to initial values
        reset: () => actionsInstance.reset(dispatch),
      };
    }, [actionsInstance, dispatch]);

    // Create complete context value - only recreate when state or actions change
    const value = useMemo(
      () => ({
        state,
        dispatch,
        actions,
      }),
      [state, actions],
    );

    return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
  }

  /**
   * Custom hook for accessing the query context
   * @returns The query context value with state and actions
   * @throws Error if used outside of a QueryProvider
   */
  function useQuery() {
    const context = useContext(QueryContext);

    if (context === undefined) {
      throw new Error("useQuery must be used within a QueryProvider");
    }

    return context;
  }

  return { QueryProvider, useQuery };
}
