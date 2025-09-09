import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Product,
  API_ENDPOINTS,
  CACHE_CONFIG,
  transformApiResponse,
} from '@connectstore/shared';

/**
 * RTK Query API for products
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.PRODUCTS,
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '',
      transformResponse: (response: any[]) => transformApiResponse(response),
      providesTags: ['Product'],
      keepUnusedDataFor: CACHE_CONFIG.PRODUCTS.KEEP_UNUSED_DATA_FOR,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetProductsQuery } = productsApi;
