import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';
import filtersSlice from './slices/filtersSlice';
import uiSlice from './slices/uiSlice';

/**
 * Configure the Redux store with RTK
 */
export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    ui: uiSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from serializability checks
        ignoredActions: [
          'persist/FLUSH',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(productsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store instance
export default store;
