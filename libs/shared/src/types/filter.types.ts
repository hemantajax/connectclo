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
  searchQuery: string;
  sortBy: SortOption;
  priceRange: PriceRange;
  isActive: boolean; // Whether any filters are currently applied
}

/**
 * Filter actions for Redux
 */
export interface FilterActions {
  setPricingOptions: (options: PricingOption[]) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setPriceRange: (range: PriceRange) => void;
  resetFilters: () => void;
  clearSearch: () => void;
}

/**
 * Filter configuration constants
 */
export const FILTER_CONSTANTS = {
  PRICE_RANGE: {
    MIN: 0,
    MAX: 999,
    STEP: 1,
  },
  SEARCH: {
    DEBOUNCE_MS: 300,
    MIN_CHARACTERS: 0,
  },
  PRICING_OPTIONS: [
    PricingOption.PAID,
    PricingOption.FREE,
    PricingOption.VIEW_ONLY,
  ],
} as const;
