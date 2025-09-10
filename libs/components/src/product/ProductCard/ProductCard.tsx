import React from 'react';
import { Product, formatPrice } from '@connectstore/shared';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  const displayPrice = formatPrice(product.price, product.pricingOption);

  return (
    <div className={`card card-dark h-100 product-card ${className}`}>
      {/* Product Image */}
      <div className="position-relative overflow-hidden">
        <img
          src={product.imagePath}
          className="card-img-top"
          alt={product.title}
          style={{
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          loading="lazy"
        />

        {/* Pricing Badge */}
        <div className="position-absolute top-0 end-0 m-2">
          <span
            className={`badge ${
              product.pricingOption === 1
                ? 'bg-success'
                : product.pricingOption === 0
                ? 'bg-primary'
                : 'bg-secondary'
            }`}
          >
            {product.pricingOption === 2
              ? 'View Only'
              : product.pricingOption === 1
              ? 'PAID'
              : 'FREE'}
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

        {/* Creator Name */}
        <p className="card-text text-muted small mb-2">
          <i className="bi bi-person me-1"></i>
          By: {product.creator}
        </p>

        {/* Price Display */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span
              className={`fw-bold ${
                product.pricingOption === 1
                  ? 'text-success'
                  : product.pricingOption === 0
                  ? 'text-primary'
                  : 'text-muted'
              }`}
            >
              {displayPrice}
            </span>

            {/* Action Button */}
            <button
              className={`btn btn-sm ${
                product.pricingOption === 1
                  ? 'btn-success'
                  : product.pricingOption === 0
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              disabled={product.pricingOption === 2}
            >
              {product.pricingOption === 1
                ? 'Buy Now'
                : product.pricingOption === 0
                ? 'Get Free'
                : 'View Only'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
