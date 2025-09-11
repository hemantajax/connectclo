import { createSelector } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';
import {
  filterProducts,
  sortProducts,
  PricingOption,
} from '@connectstore/shared';
import { selectAllFilters, selectSortBy } from './filtersSelectors';

// RTK Query selectors
export const selectProductsQuery = productsApi.endpoints.getProducts.select();

// Base selectors
export const selectAllProducts = createSelector(
  [selectProductsQuery],
  (productsResult) => productsResult.data || []
);

export const selectProductsLoading = createSelector(
  [selectProductsQuery],
  (productsResult) => productsResult.isLoading
);

export const selectProductsError = createSelector(
  [selectProductsQuery],
  (productsResult) => productsResult.error
);

// Filtered products selector
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectAllFilters],
  (products, filters) => filterProducts(products, filters)
);

// Sorted and filtered products selector
export const selectFilteredAndSortedProducts = createSelector(
  [selectFilteredProducts, selectSortBy],
  (filteredProducts, sortBy) => sortProducts(filteredProducts, sortBy)
);

// Product statistics selectors
export const selectProductsCount = createSelector(
  [selectAllProducts],
  (products) => products.length
);

export const selectFilteredProductsCount = createSelector(
  [selectFilteredProducts],
  (filteredProducts) => filteredProducts.length
);

// Pricing statistics
export const selectPricingStats = createSelector(
  [selectAllProducts],
  (products) => {
    const stats = {
      total: products.length,
      paid: 0,
      free: 0,
      priceRange: { min: 0, max: 0 },
    };

    const prices: number[] = [];

    products.forEach((product) => {
      switch (product.pricingOption) {
        case PricingOption.PAID:
          stats.paid++;
          if (product.price !== undefined) {
            prices.push(product.price);
          }
          break;
        case PricingOption.FREE:
          stats.free++;
          break;
      }
    });

    if (prices.length > 0) {
      stats.priceRange.min = Math.min(...prices);
      stats.priceRange.max = Math.max(...prices);
    }

    return stats;
  }
);
