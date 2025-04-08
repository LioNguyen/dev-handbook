import { useCallback } from "react";
import { NavigateOptions, useNavigate as useRouterNavigate } from "react-router-dom";

interface NavigateParams {
  path: string;
  options?: NavigateOptions;
  query?: Record<string, string>;
}

/**
 * Enhanced navigation hook that extends React Router's useNavigate with query params
 * @returns Enhanced navigate function with support for query parameters
 */
export function useNavigate() {
  const navigate = useRouterNavigate();

  const enhancedNavigate = useCallback(
    ({ path, options, query }: NavigateParams) => {
      // Build query string if params are provided
      if (query && Object.keys(query).length > 0) {
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(query)) {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value);
          }
        }

        const queryString = queryParams.toString();
        if (queryString) {
          path = `${path}?${queryString}`;
        }
      }

      navigate(path, options);
    },
    [navigate],
  );

  // Additional utility for going back
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Additional utility for going to home
  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    navigate: enhancedNavigate,
    goBack,
    goHome,
    // Original navigate function if needed
    navigateOriginal: navigate,
  };
}

/**
 * Example usage:
 *
 * ```tsx
 * function ProductsPage() {
 *   const { navigate, goBack, goHome } = useNavigate();
 *   const [filters, setFilters] = useState({
 *     category: '',
 *     minPrice: '',
 *     sortBy: 'newest'
 *   });
 *
 *   // Basic navigation
 *   const viewProductDetails = (productId) => {
 *     navigate({
 *       path: `/products/${productId}`
 *     });
 *   };
 *
 *   // Navigation with query parameters
 *   const applyFilters = () => {
 *     navigate({
 *       path: '/products',
 *       query: {
 *         category: filters.category,
 *         price_min: filters.minPrice,
 *         sort: filters.sortBy
 *       }
 *     });
 *     // Results in URL like: /products?category=electronics&price_min=100&sort=newest
 *   };
 *
 *   // Navigation with router options
 *   const navigateToLogin = () => {
 *     navigate({
 *       path: '/login',
 *       options: {
 *         replace: true,  // Replace current history entry instead of pushing
 *         state: { returnUrl: window.location.pathname }  // Pass state to the next route
 *       }
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <div className="filters">
 *         <select
 *           value={filters.category}
 *           onChange={(e) => setFilters({...filters, category: e.target.value})}
 *         >
 *           <option value="">All Categories</option>
 *           <option value="electronics">Electronics</option>
 *           <option value="clothing">Clothing</option>
 *         </select>
 *
 *         <input
 *           type="number"
 *           placeholder="Min Price"
 *           value={filters.minPrice}
 *           onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
 *         />
 *
 *         <select
 *           value={filters.sortBy}
 *           onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
 *         >
 *           <option value="newest">Newest</option>
 *           <option value="price_asc">Price: Low to High</option>
 *           <option value="price_desc">Price: High to Low</option>
 *         </select>
 *
 *         <button onClick={applyFilters}>Apply Filters</button>
 *       </div>
 *
 *       <div className="navigation">
 *         <button onClick={goBack}>Go Back</button>
 *         <button onClick={goHome}>Home</button>
 *         <button onClick={navigateToLogin}>Login</button>
 *       </div>
 *
 *       <div className="products-list">
 *         <div className="product" onClick={() => viewProductDetails('prod123')}>
 *           Product 123
 *         </div>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
