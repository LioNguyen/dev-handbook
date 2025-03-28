/* eslint-disable @typescript-eslint/no-explicit-any */
// import apiClient from "axios";
import { isEmpty, isNil } from "lodash";
import { Dispatch } from "react";

import apiClient from "@core/api/apiClient";
import { BaseEntity, QueryAction, QueryActionTypes } from "./queryTypes";

// Class that encapsulates all API interactions for a resource type
export class QueryActions<T extends BaseEntity> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Fetches all resources with optional query parameters
   * @param dispatch - The reducer dispatch function
   * @param params - Optional query parameters (e.g., filtering, pagination)
   * @returns Promise with the fetched data
   */
  fetchAll = async (dispatch: Dispatch<QueryAction<T>>, params?: Record<string, any>): Promise<T[]> => {
    dispatch({ type: QueryActionTypes.FETCH_START });

    try {
      // Only include params config if params exist
      const config = !isEmpty(params) ? { params } : undefined;
      const response = await apiClient.get<T[]>(this.endpoint, config);

      dispatch({
        type: QueryActionTypes.FETCH_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error: any) {
      // Extract error message from response if available
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch data";

      dispatch({
        type: QueryActionTypes.FETCH_ERROR,
        payload: errorMessage,
      });

      throw error;
    }
  };

  /**
   * Fetches a single resource by its ID
   * @param id - The resource identifier
   * @param dispatch - The reducer dispatch function
   * @returns Promise with the fetched item
   */
  fetchById = async (id: string | number, dispatch: Dispatch<QueryAction<T>>): Promise<T> => {
    // Validate ID existence to prevent API errors
    if (isNil(id)) {
      throw new Error("ID is required to fetch a resource");
    }

    dispatch({ type: QueryActionTypes.FETCH_START });

    try {
      const response = await apiClient.get<T>(`${this.endpoint}/${id}`);

      dispatch({
        type: QueryActionTypes.FETCH_ONE_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || `Failed to fetch item with ID ${id}`;

      dispatch({
        type: QueryActionTypes.FETCH_ERROR,
        payload: errorMessage,
      });

      throw error;
    }
  };

  /**
   * Creates a new resource
   * @param data - The resource data to create (without ID)
   * @param dispatch - The reducer dispatch function
   * @returns Promise with the created item (including server-generated fields)
   */
  create = async (data: Omit<T, "id">, dispatch: Dispatch<QueryAction<T>>): Promise<T> => {
    dispatch({ type: QueryActionTypes.FETCH_START });

    try {
      const response = await apiClient.post<T>(this.endpoint, data);

      dispatch({
        type: QueryActionTypes.CREATE_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create item";

      dispatch({
        type: QueryActionTypes.FETCH_ERROR,
        payload: errorMessage,
      });

      throw error;
    }
  };

  /**
   * Updates an existing resource
   * @param id - The resource identifier
   * @param data - The partial data to update
   * @param dispatch - The reducer dispatch function
   * @returns Promise with the updated item
   */
  update = async (id: string | number, data: Partial<T>, dispatch: Dispatch<QueryAction<T>>): Promise<T> => {
    if (isNil(id)) {
      throw new Error("ID is required to update a resource");
    }

    dispatch({ type: QueryActionTypes.FETCH_START });

    try {
      const response = await apiClient.put<T>(`${this.endpoint}/${id}`, data);

      dispatch({
        type: QueryActionTypes.UPDATE_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || `Failed to update item with ID ${id}`;

      dispatch({
        type: QueryActionTypes.FETCH_ERROR,
        payload: errorMessage,
      });

      throw error;
    }
  };

  /**
   * Deletes a resource by ID
   * @param id - The resource identifier
   * @param dispatch - The reducer dispatch function
   * @returns Promise with boolean success indicator
   */
  remove = async (id: string | number, dispatch: Dispatch<QueryAction<T>>): Promise<boolean> => {
    if (isNil(id)) {
      throw new Error("ID is required to delete a resource");
    }

    dispatch({ type: QueryActionTypes.FETCH_START });

    try {
      await apiClient.delete(`${this.endpoint}/${id}`);

      dispatch({
        type: QueryActionTypes.DELETE_SUCCESS,
        payload: id,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || `Failed to delete item with ID ${id}`;

      dispatch({
        type: QueryActionTypes.FETCH_ERROR,
        payload: errorMessage,
      });

      throw error;
    }
  };

  /**
   * Selects an item in the UI (no API call)
   * @param item - The item to select, or null to clear selection
   * @param dispatch - The reducer dispatch function
   */
  select = (item: T | null, dispatch: Dispatch<QueryAction<T>>): void => {
    dispatch({
      type: QueryActionTypes.SELECT_ITEM,
      payload: item,
    });
  };

  /**
   * Clears any error in the state
   * @param dispatch - The reducer dispatch function
   */
  clearError = (dispatch: Dispatch<QueryAction<T>>): void => {
    dispatch({ type: QueryActionTypes.CLEAR_ERROR });
  };

  /**
   * Resets the state to initial values
   * @param dispatch - The reducer dispatch function
   */
  reset = (dispatch: Dispatch<QueryAction<T>>): void => {
    dispatch({ type: QueryActionTypes.RESET });
  };
}
