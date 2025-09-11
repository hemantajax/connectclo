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

  // Apply category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((product) =>
      filters.categories.includes(product.category)
    );
  }

  // Apply search filter (search in title, category, and description)
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.creator.toLowerCase().includes(query)
    );
  }

  // Apply price range filter (only for PAID items)
  if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
    filtered = filtered.filter((product) => {
      if (product.pricingOption !== PricingOption.PAID) return true;
      return (
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    });
  }

  // Apply rating filter
  if (filters.minRating > 0) {
    filtered = filtered.filter(
      (product) => product.rating.rate >= filters.minRating
    );
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

    case SortOption.HIGHEST_RATED:
      return sorted.sort((a, b) => {
        return b.rating.rate - a.rating.rate; // Descending order by rating
      });

    case SortOption.MOST_REVIEWS:
      return sorted.sort((a, b) => {
        return b.rating.count - a.rating.count; // Descending order by review count
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
    filters.categories.length > 0 ||
    filters.searchQuery.trim().length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 1000 ||
    filters.minRating > 0 ||
    filters.sortBy !== SortOption.ITEM_NAME
  );
};

/**
 * Get default filter state
 */
export const getDefaultFilterState = (): FilterState => ({
  pricingOptions: [],
  categories: [],
  searchQuery: '',
  sortBy: SortOption.ITEM_NAME,
  priceRange: { min: 0, max: 1000 },
  minRating: 0,
  isActive: false,
});
