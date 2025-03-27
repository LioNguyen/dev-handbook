import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from "@tanstack/react-query";

// Create query cache with error handling
const queryCache = new QueryCache({
  onError: error => {
    console.error("Query Error:", error);
  },
});

// Create mutation cache with error handling
const mutationCache = new MutationCache({
  onError: error => {
    console.error("Mutation Error:", error);
  },
});

// Define client config with proper typing
const queryClientConfig: QueryClientConfig = {
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
      retry: 0, // Number of retry attempts
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // gcTime: 10 * 60 * 1000, // 10 minutes - Time until inactive data is removed from cache
      // staleTime: 5 * 60 * 1000, // 5 minutes - Time until data is considered as "fresh"
      // placeholderData: keepPreviousData, // Keep previous data while fetching new data
    },
    mutations: {
      retry: 0,
    },
  },
};

// Create QueryClient instance
const queryClient = new QueryClient(queryClientConfig);

export { queryClient };
