import { Product, PricingOption, SortOption } from '../types/product.types';
import { FilterState } from '../types/filter.types';

/**
 * Filter products based on the current filter state
 */
export const filterProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  let filtered = [...products];

  // Apply pricing options filter
  if (filters.pricingOptions.length > 0) {
    filtered = filtered.filter((product) =>
      filters.pricingOptions.includes(product.pricingOption)
    );
  }

  // Apply search filter
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.creator.toLowerCase().includes(query)
    );
  }

  // Apply price range filter (only for PAID items)
  if (filters.priceRange.min > 0 || filters.priceRange.max < 999) {
    filtered = filtered.filter((product) => {
      if (product.pricingOption !== PricingOption.PAID) return true;
      return (
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    });
  }

  return filtered;
};

/**
 * Sort products based on the sort option
 */
export const sortProducts = (
  products: Product[],
  sortBy: SortOption
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case SortOption.ITEM_NAME:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case SortOption.HIGHER_PRICE:
      return sorted.sort((a, b) => {
        return b.price - a.price; // Descending order
      });

    case SortOption.LOWER_PRICE:
      return sorted.sort((a, b) => {
        return a.price - b.price; // Ascending order
      });

    default:
      // Default to ITEM_NAME sorting if invalid option
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
};

/**
 * Check if any filters are currently active
 */
export const hasActiveFilters = (filters: FilterState): boolean => {
  return (
    filters.pricingOptions.length > 0 ||
    filters.searchQuery.trim().length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 999 ||
    filters.sortBy !== SortOption.ITEM_NAME
  );
};

/**
 * Get default filter state
 */
export const getDefaultFilterState = (): FilterState => ({
  pricingOptions: [],
  searchQuery: '',
  sortBy: SortOption.ITEM_NAME,
  priceRange: { min: 0, max: 999 },
  isActive: false,
});
