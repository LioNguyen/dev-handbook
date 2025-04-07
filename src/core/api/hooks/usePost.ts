import { useState, useCallback } from "react";
import apiClient from "../apiClient";

export function usePost<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(url: string) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables?: TVariables, config?: { onSuccess?: (data: TData) => void }) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<TData>(url, variables);
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
    [url],
  );

  return {
    data,
    isLoading,
    error,
    mutate,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
}
