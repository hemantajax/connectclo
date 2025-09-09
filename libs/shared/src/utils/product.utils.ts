import { Product, PricingOption } from '../types/product.types';

/**
 * Format price for display
 */
export const formatPrice = (
  price: number | undefined,
  pricingOption: PricingOption
): string => {
  if (pricingOption === PricingOption.FREE) {
    return 'FREE';
  }

  if (pricingOption === PricingOption.VIEW_ONLY) {
    return 'View Only';
  }

  if (pricingOption === PricingOption.PAID && price !== undefined) {
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
    case PricingOption.VIEW_ONLY:
      return 'View Only';
    default:
      return 'Unknown';
  }
};

/**
 * Check if product has a valid price
 */
export const hasValidPrice = (product: Product): boolean => {
  return (
    product.pricingOption === PricingOption.PAID &&
    product.price !== undefined &&
    product.price > 0
  );
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
    typeof product.userName === 'string' &&
    Object.values(PricingOption).includes(product.pricingOption) &&
    typeof product.imageUrl === 'string'
  );
};

/**
 * Transform API response to Product array
 */
export const transformApiResponse = (apiData: any[]): Product[] => {
  return apiData.filter(isValidProduct).map((item, index) => ({
    ...item,
    id: item.id || `product-${index}`, // Ensure each product has an ID
  }));
};
