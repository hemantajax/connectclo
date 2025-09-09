/**
 * Pricing option enum as specified in the requirements
 */
export enum PricingOption {
  PAID = 'PAID',
  FREE = 'FREE',
  VIEW_ONLY = 'VIEW_ONLY',
}

/**
 * Product interface based on the API structure and requirements
 */
export interface Product {
  id: string;
  title: string;
  userName: string;
  pricingOption: PricingOption;
  price?: number; // Only present for PAID items
  imageUrl: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Sort options for products
 */
export enum SortOption {
  ITEM_NAME = 'ITEM_NAME', // Default
  HIGHER_PRICE = 'HIGHER_PRICE',
  LOWER_PRICE = 'LOWER_PRICE',
}

/**
 * Product display configuration
 */
export interface ProductDisplayConfig {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  gridColumns: {
    default: number;
    below1200: number;
    below768: number;
    below480: number;
  };
}
