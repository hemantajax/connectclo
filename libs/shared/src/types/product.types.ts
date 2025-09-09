/**
 * Pricing option enum as specified in the requirements
 * API returns numbers: 0 = FREE, 1 = PAID, 2 = VIEW_ONLY
 */
export enum PricingOption {
  FREE = 0,
  PAID = 1,
  VIEW_ONLY = 2,
}

/**
 * Product interface based on the actual API structure
 */
export interface Product {
  id: string;
  title: string;
  creator: string; // API uses 'creator' instead of 'userName'
  pricingOption: PricingOption;
  price: number; // API always includes price
  imagePath: string; // API uses 'imagePath' instead of 'imageUrl'
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Raw API response interface (before transformation)
 */
export interface ApiProduct {
  id: string;
  title: string;
  creator: string;
  pricingOption: number; // API returns numbers
  price: number;
  imagePath: string;
}

/**
 * Sort options for products
 */
export enum SortOption {
  RELEVANCE = 'RELEVANCE', // Default
  ITEM_NAME = 'ITEM_NAME',
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
