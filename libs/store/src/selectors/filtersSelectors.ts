import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
export const selectFiltersState = (state: RootState) => state.filters;

// Memoized selectors
export const selectPricingOptions = createSelector(
  [selectFiltersState],
  (filters) => filters.pricingOptions
);

export const selectSearchQuery = createSelector(
  [selectFiltersState],
  (filters) => filters.searchQuery
);

export const selectSortBy = createSelector(
  [selectFiltersState],
  (filters) => filters.sortBy
);

export const selectPriceRange = createSelector(
  [selectFiltersState],
  (filters) => filters.priceRange
);

export const selectIsFiltersActive = createSelector(
  [selectFiltersState],
  (filters) => filters.isActive
);

// Combined selectors
export const selectAllFilters = createSelector(
  [selectFiltersState],
  (filters) => filters
);
