import { useState, useCallback } from "react";
import apiClient from "../apiClient";

export function useGetById<TData, TParams extends Record<string, unknown> = Record<string, unknown>>(baseUrl: string) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(
    async (
      id: string | number,
      params?: TParams,
      config?: {
        initialData?: TData;
        enabled?: boolean;
        onSuccess?: (data: TData) => void;
      },
    ) => {
      if (config?.enabled === false) return;

      const url = `${baseUrl}/${id}`;
      setIsLoading(true);
      setError(null);

      if (config?.initialData !== undefined) {
        setData(config.initialData);
      }

      try {
        const apiConfig = params ? { params } : undefined;
        const response = await apiClient.get<TData>(url, apiConfig);
        setData(response.data);
        config?.onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl],
  );

  return {
    data,
    isLoading,
    error,
    fetch,
    refetch: fetch,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
}
