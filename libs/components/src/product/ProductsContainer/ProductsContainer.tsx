import React from 'react';
import { useAppSelector } from '@connectstore/shared';
import {
  useGetProductsQuery,
  selectFilteredAndSortedProducts,
  selectFilteredProductsCount,
  selectProductsCount,
} from '@connectstore/store';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { SortingDropdown } from '../../filters/SortingDropdown/SortingDropdown';

interface ProductsContainerProps {
  className?: string;
}

export const ProductsContainer: React.FC<ProductsContainerProps> = ({
  className = '',
}) => {
  // Fetch products using RTK Query
  const { error, isLoading } = useGetProductsQuery();

  // Get filtered and sorted products from Redux selectors
  const filteredProducts = useAppSelector(selectFilteredAndSortedProducts);
  const filteredCount = useAppSelector(selectFilteredProductsCount);
  const totalCount = useAppSelector(selectProductsCount);

  return (
    <div className={className}>
      {/* Header with Results Info and Sorting */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h2 className="text-primary mb-0 me-3 h6">
            <i className="bi bi-grid me-2"></i>
            Contents List
          </h2>

          {/* Results Count Badge */}
          {!isLoading && !error && (
            <span className="badge bg-secondary">
              {filteredCount} result{filteredCount !== 1 ? 's' : ''}
              {filteredCount !== totalCount && (
                <span className="text-warning ms-1">filtered</span>
              )}
            </span>
          )}
        </div>

        {/* Inline Sorting Dropdown */}
        <SortingDropdown variant="inline" />
      </div>

      {/* Error State */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <h6 className="alert-heading">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Failed to load products
          </h6>
          <p className="mb-0">
            There was an error loading the products. Please try refreshing the
            page.
          </p>
          <hr />
          <small className="text-muted">
            Error details: {JSON.stringify(error)}
          </small>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} loading={isLoading} />

      {/* Load More / Infinite Scroll Placeholder */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <div className="text-center mt-4">
          <small className="text-muted">End of results</small>
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
