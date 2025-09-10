import { useMemo, useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface UseVirtualGridOptions<T> {
  items: T[];
  itemsPerRow: number;
  estimatedRowHeight?: number;
  overscan?: number;
}

interface UseVirtualGridReturn<T> {
  parentRef: React.RefObject<HTMLDivElement | null>;
  virtualizer: any; // Using any to avoid complex type issues with TanStack Virtual
  rows: T[][];
  virtualItemsStyle: React.CSSProperties;
  isVirtualizing: boolean;
}

/**
 * Custom hook for virtual scrolling with grid layout using window scroll
 * Optimized for Bootstrap grid system with single body scroll
 */
export function useVirtualGrid<T>({
  items,
  itemsPerRow,
  estimatedRowHeight = 350,
  overscan = 3,
}: UseVirtualGridOptions<T>): UseVirtualGridReturn<T> {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isVirtualizing, setIsVirtualizing] = useState(false);

  // Create rows from items based on itemsPerRow
  const rows = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      result.push(items.slice(i, i + itemsPerRow));
    }
    return result;
  }, [items, itemsPerRow]);

  // Initialize virtualizer with window scrolling
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () =>
      typeof window !== 'undefined' ? (window as any) : null,
    estimateSize: () => estimatedRowHeight,
    overscan,
    scrollMargin: 0,
    getItemKey: (index) => `row-${index}`,
  });

  // Track if we're actively virtualizing
  useEffect(() => {
    setIsVirtualizing(rows.length > 0);
  }, [rows.length]);

  // Virtual items container styles - no fixed height, uses natural document flow
  const virtualItemsStyle: React.CSSProperties = {
    height: `${virtualizer.getTotalSize()}px`,
    width: '100%',
    position: 'relative',
  };

  return {
    parentRef,
    virtualizer,
    rows,
    virtualItemsStyle,
    isVirtualizing,
  };
}
