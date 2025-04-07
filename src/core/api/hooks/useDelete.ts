import { useState, useCallback } from "react";
import apiClient from "../apiClient";

export function useDelete<TData = void>(urlTemplate: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = useCallback(
    async (id: string | number, config?: { onSuccess?: () => void }) => {
      const url = urlTemplate.replace(":id", id.toString());
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        await apiClient.delete<TData>(url);
        setIsSuccess(true);
        config?.onSuccess?.();
        return true;
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
    isLoading,
    error,
    isSuccess,
    mutate,
    reset: () => {
      setError(null);
      setIsSuccess(false);
    },
  };
}
