/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

// Base interface for all entities - requires an ID property
export interface BaseEntity {
  id: string | number;
  [key: string]: any; // Allows additional properties
}

// Main state shape for query data management
export interface QueryState<T extends BaseEntity> {
  data: T[]; // Array of all items
  byId: Record<string | number, T>; // Lookup object for quick access by ID
  selectedItem: T | null; // Currently selected item for editing/viewing
  isLoading: boolean; // Loading indicator
  error: string | null; // Error message if any
  lastUpdated: number | null; // Timestamp for cache validation
}

// All possible action types for CRUD operations
export enum QueryActionTypes {
  FETCH_START = "FETCH_START", // Request initiated
  FETCH_SUCCESS = "FETCH_SUCCESS", // Items successfully retrieved
  FETCH_ERROR = "FETCH_ERROR", // Error occurred
  FETCH_ONE_SUCCESS = "FETCH_ONE_SUCCESS", // Single item retrieved
  CREATE_SUCCESS = "CREATE_SUCCESS", // Item created
  UPDATE_SUCCESS = "UPDATE_SUCCESS", // Item updated
  DELETE_SUCCESS = "DELETE_SUCCESS", // Item deleted
  SELECT_ITEM = "SELECT_ITEM", // Item selected (UI state)
  CLEAR_ERROR = "CLEAR_ERROR", // Clear error state
  RESET = "RESET", // Reset to initial state
}

// Union type for all possible actions with their payloads
export type QueryAction<T extends BaseEntity> =
  | { type: QueryActionTypes.FETCH_START }
  | { type: QueryActionTypes.FETCH_SUCCESS; payload: T[] }
  | { type: QueryActionTypes.FETCH_ERROR; payload: string }
  | { type: QueryActionTypes.FETCH_ONE_SUCCESS; payload: T }
  | { type: QueryActionTypes.CREATE_SUCCESS; payload: T }
  | { type: QueryActionTypes.UPDATE_SUCCESS; payload: T }
  | { type: QueryActionTypes.DELETE_SUCCESS; payload: string | number }
  | { type: QueryActionTypes.SELECT_ITEM; payload: T | null }
  | { type: QueryActionTypes.CLEAR_ERROR }
  | { type: QueryActionTypes.RESET };

// Complete context value provided to consumers
export interface QueryContextValue<T extends BaseEntity> {
  state: QueryState<T>; // Current state
  dispatch: Dispatch<QueryAction<T>>; // Dispatch function for manual actions
  actions: {
    // Pre-bound action methods
    fetchAll: (params?: Record<string, any>) => Promise<T[]>;
    fetchById: (id: string | number) => Promise<T>;
    create: (item: Omit<T, "id">) => Promise<T>;
    update: (id: string | number, item: Partial<T>) => Promise<T>;
    remove: (id: string | number) => Promise<boolean>;
    select: (item: T | null) => void;
    clearError: () => void;
    reset: () => void;
  };
}

// Props for the QueryProvider component
export interface QueryProviderProps<T extends BaseEntity> {
  endpoint: string; // API endpoint for the resource
  initialState?: Partial<QueryState<T>>; // Optional initial state override
  children: React.ReactNode; // Child components
}
