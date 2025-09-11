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
          width={300}
          height={200}
          className="card-img-top"
          style={{
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          priority={priority}
          sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 50vw, (max-width: 1200px) 33vw, 25vw"
          rootMargin="100px" // Start loading when within 100px of viewport
          threshold={0.1}
        />

        {/* Pricing Badge */}
        <div className="position-absolute top-0 end-0 m-2">
          <span
            className={`badge ${
              product.pricingOption === 1 ? 'bg-success' : 'bg-primary'
            }`}
          >
            {product.pricingOption === 1 ? 'PAID' : 'FREE'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Product Title */}
        <h6 className="card-title text-primary mb-2" title={product.title}>
          {product.title.length > 50
            ? `${product.title.substring(0, 50)}...`
            : product.title}
        </h6>

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
            <span
              className={`fw-bold ${
                product.pricingOption === 1 ? 'text-success' : 'text-primary'
              }`}
            >
              {displayPrice}
            </span>

            {/* Action Button */}
            <button
              className={`btn btn-sm ${
                product.pricingOption === 1 ? 'btn-success' : 'btn-primary'
              }`}
            >
              {product.pricingOption === 1 ? 'Buy Now' : 'Get Free'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
