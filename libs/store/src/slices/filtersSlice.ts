import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterState,
  PricingOption,
  SortOption,
  PriceRange,
  getDefaultFilterState,
  hasActiveFilters,
} from '@connectstore/shared';

// Initial state
const initialState: FilterState = getDefaultFilterState();

/**
 * Filters slice for managing filter state
 */
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOptions = action.payload;
      state.isActive = hasActiveFilters(state);
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.isActive = hasActiveFilters(state);
    },

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.isActive = hasActiveFilters(state);
    },

    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
      state.isActive = hasActiveFilters(state);
    },

    resetFilters: (state) => {
      const defaultState = getDefaultFilterState();
      state.pricingOptions = defaultState.pricingOptions;
      state.searchQuery = defaultState.searchQuery;
      state.sortBy = defaultState.sortBy;
      state.priceRange = defaultState.priceRange;
      state.isActive = false;
    },

    clearSearch: (state) => {
      state.searchQuery = '';
      state.isActive = hasActiveFilters(state);
    },

    togglePricingOption: (state, action: PayloadAction<PricingOption>) => {
      const option = action.payload;
      const index = state.pricingOptions.indexOf(option);

      if (index > -1) {
        state.pricingOptions.splice(index, 1);
      } else {
        state.pricingOptions.push(option);
      }

      state.isActive = hasActiveFilters(state);
    },
  },
});

// Export actions
export const {
  setPricingOptions,
  setSearchQuery,
  setSortBy,
  setPriceRange,
  resetFilters,
  clearSearch,
  togglePricingOption,
} = filtersSlice.actions;

// Export reducer
export default filtersSlice.reducer;
