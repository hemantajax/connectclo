import React from 'react';
import { Product, formatPrice } from '@connectstore/shared';
import { LazyImage } from '../../common/LazyImage/LazyImage';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean; // For above-the-fold images to optimize LCP
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  priority = false,
}) => {
  const displayPrice = formatPrice(product.price, product.pricingOption);

  return (
    <div className={`card card-dark h-100 product-card ${className}`}>
      {/* Product Image */}
      <div className="position-relative overflow-hidden">
        <LazyImage
          src={product.imagePath}
          alt={product.title}
          width={400}
          height={200}
          className="card-img-top w-100"
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          priority={priority}
          sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 50vw, (max-width: 1200px) 33vw, 25vw"
          rootMargin="100px" // Start loading when within 100px of viewport
          threshold={0.1}
        />
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Product Title */}
        <h3 className="card-title text-primary mb-2 h6" title={product.title}>
          {product.title.length > 50
            ? `${product.title.substring(0, 50)}...`
            : product.title}
        </h3>

        {/* Creator Name & Category */}
        <p className="card-text text-muted small mb-1">
          <i className="bi bi-tag me-1"></i>
          {product.category}
        </p>

        {/* Rating */}
        <p className="card-text text-muted small mb-2">
          <i className="bi bi-star-fill text-warning me-1"></i>
          {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
        </p>

        {/* Price Display */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-success">{displayPrice}</span>

            {/* Action Button */}
            <button className="btn btn-sm btn-success">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
