import React, { useMemo } from 'react';
import {
  Product,
  getProductKey,
  useBreakpoint,
  useWindowVirtualGrid,
} from '@connectstore/shared';
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
  const { isMobile, isTablet, width } = useBreakpoint();

  // Calculate items per row based on Bootstrap breakpoints
  // This matches the actual CSS grid behavior: col-xl-3 col-lg-4 col-md-6
  const itemsPerRow = useMemo(() => {
    if (width < 576) return 1; // xs: col-12 (1 column)
    if (width < 768) return 2; // sm: col-6 (2 columns)
    if (width < 992) return 2; // md: col-md-6 (2 columns)
    if (width < 1200) return 3; // lg: col-lg-4 (3 columns)
    return 4; // xl: col-xl-3 (4 columns)
  }, [width]);

  // Calculate how many items should be prioritized (above the fold)
  // Generally first 1-2 rows depending on screen size
  const priorityItemsCount = useMemo(() => {
    // On mobile (1 column): first 2 items
    if (itemsPerRow === 1) return 2;
    // On tablet (2 columns): first row (2 items)
    if (itemsPerRow === 2) return 2;
    // On desktop (3-4 columns): first row
    return itemsPerRow;
  }, [itemsPerRow]);

  // Calculate estimated row height based on columns
  const estimatedRowHeight = useMemo(() => {
    // More columns = shorter rows, fewer columns = taller rows
    if (itemsPerRow === 1) return 420; // Mobile: taller cards
    if (itemsPerRow === 2) return 400; // Tablet: medium height
    if (itemsPerRow === 3) return 380; // Desktop: standard height
    return 360; // XL: compact height
  }, [itemsPerRow]);

  // Initialize virtual grid (only when not loading and has products)
  // Disable virtual scrolling for screens < 992px (tablet/mobile) to avoid overlap issues
  // Virtual scrolling only enabled for lg+ breakpoints where layout is stable
  const shouldUseVirtual = !loading && products.length > 12 && width >= 992;

  const { containerRef, virtualRows, totalHeight } = useWindowVirtualGrid({
    items: products,
    itemsPerRow,
    estimatedRowHeight, // Dynamic height based on breakpoint
    overscan: 3, // Increased buffer for smoother scrolling
    enabled: shouldUseVirtual,
  });

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

  // Render virtual scrolling for large datasets using window scroll
  const renderVirtualGrid = () => (
    <div className={`container-fluid ${className}`} ref={containerRef}>
      <div
        style={{
          height: `${totalHeight}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => (
          <div
            key={`row-${virtualRow.index}`}
            data-index={virtualRow.index}
            style={virtualRow.style}
          >
            <div className="row g-4">
              {virtualRow.items.map((product, colIndex) => (
                <div
                  key={getProductKey(
                    product,
                    virtualRow.index * itemsPerRow + colIndex
                  )}
                  className={getGridClasses()}
                >
                  <ProductCard
                    product={product}
                    priority={
                      virtualRow.index === 0 && colIndex < priorityItemsCount
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render regular grid for smaller datasets
  const renderRegularGrid = () => (
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
                <ProductCard
                  product={product}
                  priority={index < priorityItemsCount} // Above-the-fold products for LCP optimization
                />
              </div>
            ))}
      </div>
    </div>
  );

  return shouldUseVirtual ? renderVirtualGrid() : renderRegularGrid();
};

export default ProductGrid;
