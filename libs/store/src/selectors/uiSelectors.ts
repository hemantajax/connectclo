import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
export const selectUIState = (state: RootState) => state.ui;

// Memoized selectors
export const selectLoading = createSelector(
  [selectUIState],
  (ui) => ui.loading
);

export const selectError = createSelector([selectUIState], (ui) => ui.error);

export const selectCurrentPage = createSelector(
  [selectUIState],
  (ui) => ui.currentPage
);

export const selectItemsPerPage = createSelector(
  [selectUIState],
  (ui) => ui.itemsPerPage
);

export const selectTotalItems = createSelector(
  [selectUIState],
  (ui) => ui.totalItems
);

export const selectHasMore = createSelector(
  [selectUIState],
  (ui) => ui.hasMore
);

// Combined selectors
export const selectPaginationInfo = createSelector([selectUIState], (ui) => ({
  currentPage: ui.currentPage,
  itemsPerPage: ui.itemsPerPage,
  totalItems: ui.totalItems,
  hasMore: ui.hasMore,
  totalPages: Math.ceil(ui.totalItems / ui.itemsPerPage),
}));

export const selectLoadingState = createSelector([selectUIState], (ui) => ({
  loading: ui.loading,
  error: ui.error,
}));
