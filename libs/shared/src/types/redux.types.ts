import { FilterState } from './filter.types';

/**
 * UI state interface for loading, errors, and pagination
 */
export interface UIState {
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasMore: boolean; // For infinite scroll
}

/**
 * Base root state interface for the Redux store
 */
export interface BaseRootState {
  filters: FilterState;
  ui: UIState;
  // RTK Query API slices will be added automatically
}

/**
 * Thunk API configuration
 */
export interface ThunkConfig {
  state: BaseRootState;
  rejectValue: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

/**
 * Filter query parameters for API calls
 */
export interface FilterQueryParams extends PaginationParams {
  search?: string;
  pricingOptions?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}
