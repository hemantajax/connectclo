import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@connectstore/shared';

// Initial state
const initialState: UIState = {
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
  hasMore: true,
};

/**
 * UI slice for managing UI state
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },

    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
      // Calculate if there are more items to load
      state.hasMore = state.currentPage * state.itemsPerPage < state.totalItems;
    },

    nextPage: (state) => {
      if (state.hasMore) {
        state.currentPage += 1;
      }
    },

    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMore = true;
    },

    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  clearError,
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  nextPage,
  resetPagination,
  setHasMore,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;
