import React, { useState, useCallback } from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  priority?: boolean; // For above-the-fold images
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  loading = 'lazy',
  priority = false,
  sizes,
  onLoad,
  onError,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Generate WebP and AVIF versions if the original is not already optimized
  const generateOptimizedSources = (originalSrc: string) => {
    const isAlreadyOptimized =
      originalSrc.includes('.webp') || originalSrc.includes('.avif');
    if (isAlreadyOptimized) return null;

    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    return [
      { srcSet: `${basePath}.avif`, type: 'image/avif' },
      { srcSet: `${basePath}.webp`, type: 'image/webp' },
    ];
  };

  const optimizedSources = generateOptimizedSources(src);

  // Generate responsive srcSet for different screen densities
  const generateSrcSet = (originalSrc: string) => {
    if (!sizes) return undefined;

    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();

    // Generate different sizes: 1x, 1.5x, 2x
    return `${basePath}.${extension} 1x, ${basePath}@1.5x.${extension} 1.5x, ${basePath}@2x.${extension} 2x`;
  };

  const srcSet = generateSrcSet(src);

  if (imageError) {
    return (
      <div
        className={`d-flex align-items-center justify-content-center bg-secondary ${className}`}
        style={{
          width,
          height,
          ...style,
        }}
      >
        <i className="bi bi-image text-muted" style={{ fontSize: '2rem' }} />
      </div>
    );
  }

  return (
    <picture>
      {optimizedSources?.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          type={source.type}
          sizes={sizes}
        />
      ))}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : loading}
        decoding="async"
        srcSet={srcSet}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        // Add fetchpriority for above-the-fold images
        {...(priority && { fetchPriority: 'high' as 'high' | 'low' | 'auto' })}
      />

      {/* Loading skeleton overlay */}
      {!imageLoaded && !imageError && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-secondary opacity-25 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1 }}
        >
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </picture>
  );
};

export default OptimizedImage;
