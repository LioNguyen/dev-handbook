import { get, keyBy, omit } from "lodash";
import { BaseEntity, QueryAction, QueryActionTypes, QueryState } from "./queryTypes";

// Creates a fresh initial state object
export function createInitialState<T extends BaseEntity>(): QueryState<T> {
  return {
    data: [],
    byId: {},
    selectedItem: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
  };
}

// Main reducer function that handles all state transitions based on actions
export function queryReducer<T extends BaseEntity>(state: QueryState<T>, action: QueryAction<T>): QueryState<T> {
  switch (action.type) {
    case QueryActionTypes.FETCH_START:
      // Set loading state, clear any previous errors
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case QueryActionTypes.FETCH_SUCCESS: {
      // Store retrieved items in both array and lookup object forms
      const byId = keyBy(action.payload, "id");
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        byId,
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case QueryActionTypes.FETCH_ERROR:
      // Store error message and turn off loading
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case QueryActionTypes.FETCH_ONE_SUCCESS: {
      // Check if item already exists to update or add it
      const existing = !!get(state.byId, action.payload.id);
      return {
        ...state,
        isLoading: false,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        // Replace item if it exists, otherwise add to array
        data: existing
          ? state.data.map((item) => (item.id === action.payload.id ? action.payload : item))
          : [...state.data, action.payload],
        selectedItem: action.payload,
        lastUpdated: Date.now(),
      };
    }

    case QueryActionTypes.CREATE_SUCCESS: {
      // Add new item to both array and lookup object
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
        byId: { ...state.byId, [action.payload.id]: action.payload },
        selectedItem: action.payload,
        lastUpdated: Date.now(),
      };
    }

    case QueryActionTypes.UPDATE_SUCCESS: {
      // Update item in both array and lookup object
      return {
        ...state,
        isLoading: false,
        data: state.data.map((item) => (item.id === action.payload.id ? action.payload : item)),
        byId: { ...state.byId, [action.payload.id]: action.payload },
        // Update selected item if it's the one being edited
        selectedItem: state.selectedItem?.id === action.payload.id ? action.payload : state.selectedItem,
        lastUpdated: Date.now(),
      };
    }

    case QueryActionTypes.DELETE_SUCCESS: {
      // Remove item from both array and lookup object
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((item) => item.id !== action.payload),
        byId: omit(state.byId, [action.payload.toString()]),
        // Clear selection if the deleted item was selected
        selectedItem: state.selectedItem?.id === action.payload ? null : state.selectedItem,
        lastUpdated: Date.now(),
      };
    }

    case QueryActionTypes.SELECT_ITEM:
      // Update the selected item (typically for editing)
      return {
        ...state,
        selectedItem: action.payload,
      };

    case QueryActionTypes.CLEAR_ERROR:
      // Clear any error message
      return {
        ...state,
        error: null,
      };

    case QueryActionTypes.RESET:
      // Reset to a clean initial state
      return createInitialState<T>();

    default:
      return state;
  }
}
