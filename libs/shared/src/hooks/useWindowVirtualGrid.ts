import { useMemo, useRef, useEffect, useState, useCallback } from 'react';

interface UseWindowVirtualGridOptions<T> {
  items: T[];
  itemsPerRow: number;
  estimatedRowHeight?: number;
  overscan?: number;
  enabled?: boolean;
}

interface UseWindowVirtualGridReturn<T> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  virtualRows: Array<{
    index: number;
    items: T[];
    style: React.CSSProperties;
  }>;
  totalHeight: number;
  isVirtualizing: boolean;
}

/**
 * Custom hook for window-based virtual scrolling with grid layout
 * Uses single body scroll with viewport-based rendering
 */
export function useWindowVirtualGrid<T>({
  items,
  itemsPerRow,
  estimatedRowHeight = 380,
  overscan = 3,
  enabled = true,
}: UseWindowVirtualGridOptions<T>): UseWindowVirtualGridReturn<T> {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Create rows from items
  const rows = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      result.push(items.slice(i, i + itemsPerRow));
    }
    return result;
  }, [items, itemsPerRow]);

  const totalHeight = rows.length * estimatedRowHeight;

  // Update viewport and container position
  const updateScrollPosition = useCallback(() => {
    if (typeof window === 'undefined') return;

    setScrollTop(window.scrollY);
    setViewportHeight(window.innerHeight);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerTop(window.scrollY + rect.top);
    }
  }, []);

  // Set up scroll listener
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    updateScrollPosition();

    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    const handleResize = () => {
      updateScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, updateScrollPosition]);

  // Calculate visible rows
  const virtualRows = useMemo(() => {
    if (!enabled || rows.length === 0) return [];

    const containerScrollTop = Math.max(0, scrollTop - containerTop);
    const startIndex = Math.max(
      0,
      Math.floor(containerScrollTop / estimatedRowHeight) - overscan
    );
    const endIndex = Math.min(
      rows.length - 1,
      Math.ceil((containerScrollTop + viewportHeight) / estimatedRowHeight) +
        overscan
    );

    const visibleRows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (rows[i]) {
        visibleRows.push({
          index: i,
          items: rows[i],
          style: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: `${estimatedRowHeight}px`,
            transform: `translateY(${i * estimatedRowHeight}px)`,
          },
        });
      }
    }

    return visibleRows;
  }, [
    enabled,
    rows,
    scrollTop,
    containerTop,
    viewportHeight,
    estimatedRowHeight,
    overscan,
  ]);

  return {
    containerRef,
    virtualRows,
    totalHeight,
    isVirtualizing: enabled && rows.length > 0,
  };
}
