import React, { useState, useCallback, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number; // Intersection observer threshold
  rootMargin?: string; // How far before entering viewport to start loading
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  sizes,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '50px', // Start loading 50px before entering viewport
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority); // Priority images load immediately
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Intersection Observer setup for lazy loading
  useEffect(() => {
    if (priority || shouldLoad) return; // Skip observer if priority or already should load

    const img = imgRef.current;
    if (!img) return;

    // Use native lazy loading as fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, shouldLoad, threshold, rootMargin]);

  // Generate responsive srcSet for different screen densities (only for local images)
  const generateSrcSet = (originalSrc: string) => {
    if (!sizes) return undefined;

    const isExternalUrl =
      originalSrc.startsWith('http://') || originalSrc.startsWith('https://');
    if (isExternalUrl) return undefined; // Skip srcSet for external URLs

    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();

    return `${basePath}.${extension} 1x, ${basePath}@1.5x.${extension} 1.5x, ${basePath}@2x.${extension} 2x`;
  };

  const srcSet = generateSrcSet(src);

  if (imageError) {
    return (
      <div
        className={`d-flex align-items-center justify-content-center bg-secondary ${className}`}
        style={{
          height,
          ...style,
        }}
      >
        <i className="bi bi-image text-muted" style={{ fontSize: '2rem' }} />
      </div>
    );
  }

  return (
    <div className="position-relative" style={{ height }}>
      <img
        ref={imgRef}
        src={
          shouldLoad
            ? src
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'
        } // 1x1 transparent placeholder
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        srcSet={shouldLoad ? srcSet : undefined}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin="anonymous"
        {...(priority && { fetchPriority: 'high' as 'high' | 'low' | 'auto' })}
      />

      {/* Loading skeleton overlay */}
      {shouldLoad && !imageLoaded && !imageError && (
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

      {/* Placeholder for non-loaded images */}
      {!shouldLoad && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-dark d-flex align-items-center justify-content-center"
          style={{ zIndex: 1 }}
        >
          <i
            className="bi bi-image text-muted opacity-50"
            style={{ fontSize: '2rem' }}
          />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
