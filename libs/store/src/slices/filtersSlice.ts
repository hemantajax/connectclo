import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterState,
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
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
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

    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
      state.isActive = hasActiveFilters(state);
    },

    resetFilters: (state) => {
      const defaultState = getDefaultFilterState();
      state.categories = defaultState.categories;
      state.searchQuery = defaultState.searchQuery;
      state.sortBy = defaultState.sortBy;
      state.priceRange = defaultState.priceRange;
      state.minRating = defaultState.minRating;
      state.isActive = false;
    },

    clearSearch: (state) => {
      state.searchQuery = '';
      state.isActive = hasActiveFilters(state);
    },

    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);

      if (index > -1) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(category);
      }

      state.isActive = hasActiveFilters(state);
    },
  },
});

// Export actions
export const {
  setCategories,
  setSearchQuery,
  setSortBy,
  setPriceRange,
  setMinRating,
  resetFilters,
  clearSearch,
  toggleCategory,
} = filtersSlice.actions;

// Export reducer
export default filtersSlice.reducer;
