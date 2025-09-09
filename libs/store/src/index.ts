// Export the store and types
export { default as store } from './store';
export type { RootState, AppDispatch } from './store';

// Export API
export * from './api/productsApi';

// Export slices and actions
export * from './slices/filtersSlice';
export * from './slices/uiSlice';

// Export selectors
export * from './selectors';

// Export the main store component (if needed)
export * from './lib/store';
