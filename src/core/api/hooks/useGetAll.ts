import { useState, useCallback, useRef, useEffect } from "react";
import apiClient from "../apiClient";

// Define cache entry type
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  params?: Record<string, unknown>;
}

// Global cache with proper typing
const cache: Record<string, CacheEntry<unknown>> = {};

// Create cache key from URL and params
function getCacheKey(url: string, params?: Record<string, unknown>): string {
  if (!params) return url;

  const sortedParams = Object.keys(params)
    .sort()
    .reduce<Record<string, unknown>>((obj, key) => {
      if (params[key] !== undefined) obj[key] = params[key];
      return obj;
    }, {});

  return `${url}:${JSON.stringify(sortedParams)}`;
}

// Hook options type
interface UseGetAllOptions {
  cacheTime: number;
  staleTime: number;
  paginated: boolean;
  keepPreviousData: boolean;
  autoFetch: boolean;
}

// Configuration for fetch function
interface FetchConfig<TData> {
  initialData?: TData;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  skipCache?: boolean;
  updateCacheOnly?: boolean;
  preservePreviousData?: boolean;
  updateParamsState?: boolean;
}

// Pagination parameters type
interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export function useGetAll<TData, TParams extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  defaultParams?: TParams,
  options: Partial<UseGetAllOptions> = {
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 60 * 1000, // 1 minute
    paginated: true,
    keepPreviousData: true,
    autoFetch: true, // Auto fetch on mount or params change
  },
) {
  const fullOptions: UseGetAllOptions = {
    cacheTime: 5 * 60 * 1000,
    staleTime: 60 * 1000,
    paginated: true,
    keepPreviousData: true,
    autoFetch: true,
    ...options,
  };

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
    (checkParams?: Record<string, unknown>): boolean => {
      const entry = cache[getCacheKey(url, checkParams)] as CacheEntry<TData> | undefined;
      return !entry || Date.now() - entry.timestamp > fullOptions.staleTime;
    },
    [url, fullOptions.staleTime],
  );

  // Cleanup expired cache
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      Object.keys(cache).forEach((key) => {
        if (now - cache[key].timestamp > fullOptions.cacheTime) delete cache[key];
      });
    };
    const interval = setInterval(cleanup, 60 * 1000);
    return () => clearInterval(interval);
  }, [fullOptions.cacheTime]);

  // Main fetch function
  const fetch = useCallback(
    async (fetchParams?: TParams & PaginationParams, config?: FetchConfig<TData>): Promise<TData | null> => {
      if (config?.enabled === false) return null;
      if (activeRequest.current) return activeRequest.current;

      const paramsToUse = fetchParams || params;

      // Update params state and ref if new params provided and updateParamsState not explicitly false
      if (fetchParams && config?.updateParamsState !== false) {
        setParams(fetchParams);
        lastParams.current = fetchParams;
      }

      const cacheKey = getCacheKey(url, paramsToUse);
      const keepPrevious = config?.preservePreviousData ?? fullOptions.keepPreviousData;

      // Check cache first
      if (!config?.skipCache) {
        const cached = cache[cacheKey] as CacheEntry<TData> | undefined;
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
    [url, data, isStale, fullOptions.keepPreviousData, params],
  );

  // Auto-fetch on mount or when params change
  useEffect(() => {
    if (fullOptions.autoFetch) {
      fetch(params, { updateParamsState: false }); // Prevent infinite loop
    }
  }, [fetch, params, fullOptions.autoFetch]);

  // Cache management helpers
  const invalidateCache = useCallback(
    (invalidateParams?: Record<string, unknown>): void => {
      delete cache[getCacheKey(url, invalidateParams || params)];
    },
    [url, params],
  );

  const invalidateAllCache = useCallback((): void => {
    const prefix = `${url}:`;
    Object.keys(cache).forEach((key) => {
      if (key === url || key.startsWith(prefix)) delete cache[key];
    });
  }, [url]);

  const refresh = useCallback(
    (refreshParams?: TParams, refreshConfig?: FetchConfig<TData>): Promise<TData | null> =>
      fetch(refreshParams || params, { ...refreshConfig, skipCache: true }),
    [fetch, params],
  );

  const backgroundRefresh = useCallback(
    (refreshParams?: TParams, refreshConfig?: FetchConfig<TData>): Promise<TData | null> =>
      fetch(refreshParams || params, { ...refreshConfig, updateCacheOnly: true }),
    [fetch, params],
  );

  const refetchLast = useCallback(
    (): Promise<TData | null> | null =>
      lastParams.current ? fetch(lastParams.current, { updateParamsState: false }) : null,
    [fetch],
  );

  const getCachedPages = useCallback((): (Record<string, unknown> | undefined)[] => {
    const prefix = `${url}:`;
    return Object.keys(cache)
      .filter((key) => key === url || key.startsWith(prefix))
      .map((key) => cache[key].params)
      .filter(Boolean);
  }, [url]);

  const clearAllCache = useCallback((): void => {
    Object.keys(cache).forEach((key) => delete cache[key]);
  }, []);

  const reset = useCallback((): void => {
    setData(null);
    setError(null);
    invalidateAllCache();
  }, [invalidateAllCache]);

  const isCached = useCallback(
    (checkParams?: TParams): boolean => !!cache[getCacheKey(url, checkParams || params)],
    [url, params],
  );

  return {
    data,
    isLoading,
    isFetching,
    error,
    params,
    fetch,
    refresh,
    refetchLast,
    backgroundRefresh,
    invalidateCache,
    invalidateAllCache,
    clearAllCache,
    reset,
    isCached,
    isStale,
    getCachedPages,
  };
}
