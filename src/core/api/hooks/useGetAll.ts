import { useState, useCallback, useRef, useEffect } from "react";
import apiClient from "../apiClient";

// Global cache with simplified interface
const cache: Record<string, { data: any; timestamp: number; params?: any }> = {};

// Create cache key from URL and params
function getCacheKey(url: string, params?: any): string {
  if (!params) return url;

  const sortedParams = Object.keys(params)
    .sort()
    .reduce((obj: Record<string, any>, key) => {
      if (params[key] !== undefined) obj[key] = params[key];
      return obj;
    }, {});

  return `${url}:${JSON.stringify(sortedParams)}`;
}

export function useGetAll<TData, TParams extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  defaultParams?: TParams,
  options = {
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 60 * 1000, // 1 minute
    paginated: true,
    keepPreviousData: true,
    autoFetch: true, // Auto fetch on mount or params change
  },
) {
  // State
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState<TParams | undefined>(defaultParams);

  // Refs
  const isMounted = useRef(true);
  const activeRequest = useRef<Promise<TData | null> | null>(null);
  const lastParams = useRef<TParams | undefined>(defaultParams);

  // Cleanup on unmount
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  // Check if data is stale
  const isStale = useCallback(
    (params?: any) => {
      const entry = cache[getCacheKey(url, params)];
      return !entry || Date.now() - entry.timestamp > options.staleTime;
    },
    [url, options.staleTime],
  );

  // Cleanup expired cache
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      Object.keys(cache).forEach((key) => {
        if (now - cache[key].timestamp > options.cacheTime) delete cache[key];
      });
    };
    const interval = setInterval(cleanup, 60 * 1000);
    return () => clearInterval(interval);
  }, [options.cacheTime]);

  // Main fetch function
  const fetch = useCallback(
    async (
      fetchParams?: TParams & { page?: number; limit?: number; sort?: string; order?: "asc" | "desc" },
      config?: {
        initialData?: TData;
        enabled?: boolean;
        onSuccess?: (data: TData) => void;
        skipCache?: boolean;
        updateCacheOnly?: boolean;
        preservePreviousData?: boolean;
        updateParamsState?: boolean; // Flag to control params state updates
      },
    ): Promise<TData | null> => {
      if (config?.enabled === false) return null;
      if (activeRequest.current) return activeRequest.current;

      const paramsToUse = fetchParams || params;

      // Update params state and ref if new params provided and updateParamsState not explicitly false
      if (fetchParams && config?.updateParamsState !== false) {
        setParams(fetchParams);
        lastParams.current = fetchParams;
      }

      const cacheKey = getCacheKey(url, paramsToUse);
      const keepPrevious = config?.preservePreviousData ?? options.keepPreviousData;

      // Check cache first
      if (!config?.skipCache) {
        const cached = cache[cacheKey];
        if (cached && !isStale(paramsToUse)) {
          if (!config?.updateCacheOnly) setData(cached.data);
          config?.onSuccess?.(cached.data);
          return cached.data;
        }
      }

      // Set loading states
      if (config?.updateCacheOnly) {
        setIsFetching(true);
      } else if (keepPrevious && data) {
        setIsFetching(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      // Set initial data if provided
      if (config?.initialData !== undefined && !config?.updateCacheOnly) {
        setData(config.initialData);
      }

      // Create fetch promise
      const fetchPromise = (async () => {
        try {
          const response = await apiClient.get<TData>(url, paramsToUse ? { params: paramsToUse } : undefined);

          // Update cache
          cache[cacheKey] = {
            data: response.data,
            timestamp: Date.now(),
            params: paramsToUse,
          };

          // Update state if component is still mounted
          if (isMounted.current && !config?.updateCacheOnly) {
            setData(response.data);
          }

          lastParams.current = paramsToUse;
          config?.onSuccess?.(response.data);
          return response.data;
        } catch (err) {
          const error = err instanceof Error ? err : new Error("An error occurred");
          if (isMounted.current && !config?.updateCacheOnly) setError(error);
          throw error;
        } finally {
          if (isMounted.current) {
            if (!config?.updateCacheOnly) setIsLoading(false);
            setIsFetching(false);
          }
          activeRequest.current = null;
        }
      })();

      activeRequest.current = fetchPromise;
      return fetchPromise;
    },
    [url, data, isStale, options.keepPreviousData, params],
  );

  // Auto-fetch on mount or when params change
  useEffect(() => {
    if (options.autoFetch) {
      fetch(params, { updateParamsState: false }); // Prevent infinite loop
    }
  }, [fetch, params, options.autoFetch]);

  // Cache management helpers
  const invalidateCache = useCallback(
    (invalidateParams?: any) => {
      delete cache[getCacheKey(url, invalidateParams || params)];
    },
    [url, params],
  );

  const invalidateAllCache = useCallback(() => {
    const prefix = `${url}:`;
    Object.keys(cache).forEach((key) => {
      if (key === url || key.startsWith(prefix)) delete cache[key];
    });
  }, [url]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    params, // Current params accessible
    fetch,
    refresh: (refreshParams?: any, config?: any) => fetch(refreshParams || params, { ...config, skipCache: true }),
    refetchLast: () => (lastParams.current ? fetch(lastParams.current, { updateParamsState: false }) : null),
    backgroundRefresh: (refreshParams?: any, config?: any) =>
      fetch(refreshParams || params, { ...config, updateCacheOnly: true }),
    invalidateCache,
    invalidateAllCache,
    clearAllCache: () => Object.keys(cache).forEach((key) => delete cache[key]),
    reset: () => {
      setData(null);
      setError(null);
      invalidateAllCache();
    },
    isCached: (checkParams?: any) => !!cache[getCacheKey(url, checkParams || params)],
    isStale,
    getCachedPages: () => {
      const prefix = `${url}:`;
      return Object.keys(cache)
        .filter((key) => key === url || key.startsWith(prefix))
        .map((key) => cache[key].params)
        .filter(Boolean);
    },
  };
}
