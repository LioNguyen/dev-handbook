import { useCallback } from "react";
import { useLocation as useRouterLocation, useSearchParams } from "react-router-dom";

/**
 * A simplified location hook that provides access to pathname and search parameters
 *
 * @returns An object with pathname and search parameter utilities
 */
export function useLocation() {
  const location = useRouterLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get a search parameter value
   * @param key The parameter key
   * @param defaultValue Optional default value if parameter doesn't exist
   */
  const getParam = useCallback(
    (key: string, defaultValue?: string): string | undefined => {
      const value = searchParams.get(key);
      return value !== null ? value : defaultValue;
    },
    [searchParams],
  );

  /**
   * Check if a parameter exists in the search params
   * @param key The parameter key
   */
  const hasParam = useCallback(
    (key: string): boolean => {
      return searchParams.has(key);
    },
    [searchParams],
  );

  /**
   * Check if a parameter has a specific value
   * @param key The parameter key
   * @param value The value to check against
   */
  const paramEquals = useCallback(
    (key: string, value: string): boolean => {
      return searchParams.get(key) === value;
    },
    [searchParams],
  );

  /**
   * Set search parameters (merges with existing parameters by default)
   * @param params Parameters to set
   * @param options Configuration options
   */
  const setParams = useCallback(
    (
      params: Record<string, string>,
      options: { replace?: boolean; preserveExisting?: boolean } = { preserveExisting: true },
    ) => {
      const newParams = options.preserveExisting ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();

      // Add or update parameters
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      setSearchParams(newParams, { replace: options.replace });
    },
    [searchParams, setSearchParams],
  );

  /**
   * Remove specific parameters from the URL
   * @param keys Keys to remove
   * @param options Configuration options
   */
  const removeParams = useCallback(
    (keys: string[], options: { replace?: boolean } = {}) => {
      const newParams = new URLSearchParams(searchParams.toString());

      keys.forEach((key) => {
        newParams.delete(key);
      });

      setSearchParams(newParams, { replace: options.replace });
    },
    [searchParams, setSearchParams],
  );

  /**
   * Get all search parameters as an object
   */
  const getAllParams = useCallback((): Record<string, string> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return {
    // Basic properties
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,

    // Search params methods
    getParam,
    hasParam,
    paramEquals,
    setParams,
    removeParams,
    getAllParams,

    // Access to raw search params if needed
    searchParams,
  };
}

/**
 * Example usage:
 *
 * ```tsx
 * function ProductList() {
 *   const location = useLocation();
 *   const [products, setProducts] = useState([]);
 *
 *   // Access pathname
 *   console.log("Current path:", location.pathname);
 *
 *   // Access query parameters
 *   const category = location.getParam("category", "all");
 *   const sortBy = location.getParam("sort");
 *
 *   // Check if parameters exist or have specific values
 *   const isFilterActive = location.hasParam("filter");
 *   const isAscending = location.paramEquals("order", "asc");
 *
 *   useEffect(() => {
 *     // Fetch products based on query parameters
 *     fetchProducts({
 *       category,
 *       sortBy,
 *       order: location.getParam("order")
 *     });
 *   }, [location.search]);
 *
 *   // Update search parameters
 *   const handleCategoryChange = (e) => {
 *     location.setParams({ category: e.target.value });
 *   };
 *
 *   const handleSortChange = (sortValue) => {
 *     location.setParams({ sort: sortValue });
 *   };
 *
 *   const resetFilters = () => {
 *     location.removeParams(["category", "sort", "order"]);
 *   };
 *
 *   // Get all current parameters as an object
 *   const currentFilters = location.getAllParams();
 *
 *   return (
 *     <div>
 *       <h1>Products</h1>
 *
 *       <div className="filters">
 *         <select
 *           value={category}
 *           onChange={handleCategoryChange}
 *         >
 *           <option value="all">All Categories</option>
 *           <option value="electronics">Electronics</option>
 *           <option value="clothing">Clothing</option>
 *         </select>
 *
 *         <div className="sort-buttons">
 *           <button
 *             className={sortBy === "price" ? "active" : ""}
 *             onClick={() => handleSortChange("price")}
 *           >
 *             Sort by Price
 *           </button>
 *           <button
 *             className={sortBy === "name" ? "active" : ""}
 *             onClick={() => handleSortChange("name")}
 *           >
 *             Sort by Name
 *           </button>
 *         </div>
 *
 *         <button onClick={resetFilters}>Reset Filters</button>
 *       </div>
 *
 *     </div>
 *   );
 * }
 * ```
 */
