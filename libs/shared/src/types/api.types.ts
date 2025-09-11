import { Product } from './product.types';

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  PRODUCTS: 'https://fakestoreapi.com/products',
} as const;

/**
 * API response from the products endpoint
 */
export interface ProductsApiResponse extends Array<Product> {}

/**
 * API error response structure
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

/**
 * Network request status
 */
export enum RequestStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

/**
 * Cache configuration for RTK Query
 */
export const CACHE_CONFIG = {
  PRODUCTS: {
    KEEP_UNUSED_DATA_FOR: 300, // 5 minutes in seconds
    REFETCH_ON_MOUNT_OR_ARG_CHANGE: true,
    REFETCH_ON_FOCUS: false,
    REFETCH_ON_RECONNECT: true,
  },
} as const;
