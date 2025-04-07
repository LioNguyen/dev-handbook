import { useState, useCallback } from "react";
import apiClient from "../apiClient";

type IdType = string | number;

export function usePut<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  urlTemplate: string,
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async ({ id, ...variables }: TVariables & { id: IdType }, config?: { onSuccess?: (data: TData) => void }) => {
      const url = urlTemplate.replace(":id", id.toString());
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.put<TData>(url, variables);
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
    [urlTemplate],
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
