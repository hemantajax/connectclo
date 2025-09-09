import React from 'react';
import { Product, getProductKey, useBreakpoint } from '@connectstore/shared';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  className = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Determine grid classes based on breakpoint - matching the design
  const getGridClasses = () => {
    if (isMobile) return 'col-12'; // 1 column on mobile
    if (isTablet) return 'col-6'; // 2 columns on tablet
    return 'col-xl-3 col-lg-4 col-md-6'; // 4 columns on XL, 3 on LG, 2 on MD
  };

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`skeleton-${index}`} className={getGridClasses()}>
          <div className="card card-dark h-100">
            <div
              className="bg-secondary rounded-top"
              style={{ height: '200px' }}
            >
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="placeholder-glow">
                <span className="placeholder col-8 bg-secondary"></span>
                <span className="placeholder col-6 bg-secondary"></span>
                <span className="placeholder col-4 bg-secondary"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // Empty state
  const renderEmptyState = () => (
    <div className="col-12">
      <div className="text-center py-5">
        <i className="bi bi-search display-1 text-muted mb-3"></i>
        <h4 className="text-muted">No products found</h4>
        <p className="text-muted">
          Try adjusting your filters or search terms to find what you're looking
          for.
        </p>
      </div>
    </div>
  );

  return (
    <div className={`container-fluid ${className}`}>
      <div className="row g-4">
        {loading
          ? renderLoadingSkeleton()
          : products.length === 0
          ? renderEmptyState()
          : products.map((product, index) => (
              <div
                key={getProductKey(product, index)}
                className={getGridClasses()}
              >
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;
