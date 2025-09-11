import { Product, PricingOption, ApiProduct } from '../types/product.types';

/**
 * Format price for display
 */
export const formatPrice = (
  price: number,
  pricingOption: PricingOption
): string => {
  if (pricingOption === PricingOption.FREE) {
    return 'FREE';
  }

  if (pricingOption === PricingOption.PAID) {
    return `$${price.toFixed(2)}`;
  }

  return 'N/A';
};

/**
 * Get pricing option display label
 */
export const getPricingOptionLabel = (option: PricingOption): string => {
  switch (option) {
    case PricingOption.PAID:
      return 'Paid';
    case PricingOption.FREE:
      return 'Free';
    default:
      return 'Unknown';
  }
};

/**
 * Check if product has a valid price
 */
export const hasValidPrice = (product: Product): boolean => {
  return product.pricingOption === PricingOption.PAID && product.price > 0;
};

/**
 * Generate product card key for React rendering
 */
export const getProductKey = (product: Product, index?: number): string => {
  return product.id || `product-${index}`;
};

/**
 * Get responsive grid classes based on screen size
 */
export const getGridClasses = (): string => {
  return 'col-12 col-sm-6 col-md-4 col-lg-3';
};

/**
 * Validate product data structure
 */
export const isValidProduct = (product: any): product is Product => {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof product.title === 'string' &&
    typeof product.creator === 'string' &&
    Object.values(PricingOption).includes(product.pricingOption) &&
    typeof product.imagePath === 'string' &&
    typeof product.description === 'string' &&
    typeof product.category === 'string'
  );
};

/**
 * Transform Fake Store API response to Product array
 */
export const transformApiResponse = (apiData: ApiProduct[]): Product[] => {
  return apiData
    .map((item, index) => ({
      id: item.id?.toString() || `product-${index}`,
      title: item.title || 'Untitled',
      creator: item.category || 'Unknown Category', // Use category as creator
      pricingOption: item.price > 0 ? PricingOption.PAID : PricingOption.FREE, // Determine pricing based on price
      price: item.price || 0,
      imagePath: item.image || '',
      description: item.description || '',
      category: item.category || '',
      rating: item.rating || { rate: 0, count: 0 },
    }))
    .filter(isValidProduct);
};
