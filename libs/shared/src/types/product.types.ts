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
 * Product interface based on the Fake Store API structure
 */
export interface Product {
  id: string;
  title: string;
  creator: string; // Derived from category for display
  pricingOption: PricingOption;
  price: number;
  imagePath: string; // Mapped from 'image'
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Raw API response interface (before transformation) - Fake Store API
 */
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Sort options for products
 */
export enum SortOption {
  ITEM_NAME = 'ITEM_NAME', // Default
  HIGHER_PRICE = 'HIGHER_PRICE',
  LOWER_PRICE = 'LOWER_PRICE',
  HIGHEST_RATED = 'HIGHEST_RATED',
  MOST_REVIEWS = 'MOST_REVIEWS',
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
