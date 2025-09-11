import { PricingOption, SortOption } from './product.types';

/**
 * Price range interface for the pricing slider
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Filter state interface
 */
export interface FilterState {
  pricingOptions: PricingOption[];
  categories: string[];
  searchQuery: string;
  sortBy: SortOption;
  priceRange: PriceRange;
  minRating: number;
  isActive: boolean; // Whether any filters are currently applied
}

/**
 * Filter actions for Redux
 */
export interface FilterActions {
  setPricingOptions: (options: PricingOption[]) => void;
  setCategories: (categories: string[]) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setPriceRange: (range: PriceRange) => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
  clearSearch: () => void;
}

/**
 * Filter configuration constants
 */
export const FILTER_CONSTANTS = {
  PRICE_RANGE: {
    MIN: 0,
    MAX: 1000,
    STEP: 5,
  },
  RATING: {
    MIN: 0,
    MAX: 5,
    STEP: 0.5,
  },
  SEARCH: {
    DEBOUNCE_MS: 300,
    MIN_CHARACTERS: 0,
  },
  CATEGORIES: ["men's clothing", "women's clothing", 'electronics', 'jewelery'],
} as const;
