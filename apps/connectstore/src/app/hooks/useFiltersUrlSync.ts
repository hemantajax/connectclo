import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import { PricingOption, SortOption } from '@connectstore/shared';
import {
  selectAllFilters,
  setSearchQuery,
  setPricingOptions,
  setSortBy,
  setPriceRange,
} from '@connectstore/store';

/**
 * Synchronize all Redux filter state with URL query parameters.
 * - q: search query
 * - pricing: comma-separated pricing options (0,1,2)
 * - sort: sort option
 * - minPrice, maxPrice: price range
 */
export const useFiltersUrlSync = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectAllFilters);
  const [, setSearchParams] = useSearchParams();
  const hasHydratedFromUrl = useRef(false);

  // Hydrate Redux from URL synchronously on first render
  if (!hasHydratedFromUrl.current) {
    hasHydratedFromUrl.current = true;
    const urlParams = new URLSearchParams(window.location.search);

    // Read search query
    const urlQuery = urlParams.get('q') ?? '';
    if (urlQuery) {
      dispatch(setSearchQuery(urlQuery));
    }

    // Read pricing options
    const pricingParam = urlParams.get('pricing');
    if (pricingParam) {
      const pricingOptions = pricingParam
        .split(',')
        .map((p) => parseInt(p.trim(), 10))
        .filter((p) => Object.values(PricingOption).includes(p));
      if (pricingOptions.length > 0) {
        dispatch(setPricingOptions(pricingOptions));
      }
    }

    // Read sort option
    const sortParam = urlParams.get('sort');
    if (
      sortParam &&
      Object.values(SortOption).includes(sortParam as SortOption)
    ) {
      dispatch(setSortBy(sortParam as SortOption));
    }

    // Read price range
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    if (minPrice || maxPrice) {
      dispatch(
        setPriceRange({
          min: minPrice ? parseInt(minPrice, 10) : 0,
          max: maxPrice ? parseInt(maxPrice, 10) : 999,
        })
      );
    }
  }

  // Reflect Redux filter changes into the URL
  useEffect(() => {
    // Do not write to URL until we've hydrated from it once
    if (!hasHydratedFromUrl.current) return;

    const next = new URLSearchParams(window.location.search);

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      next.set('q', filters.searchQuery);
    } else {
      next.delete('q');
    }

    // Pricing options
    if (filters.pricingOptions.length > 0) {
      next.set('pricing', filters.pricingOptions.join(','));
    } else {
      next.delete('pricing');
    }

    // Sort option (only if not default)
    if (filters.sortBy !== SortOption.RELEVANCE) {
      next.set('sort', filters.sortBy);
    } else {
      next.delete('sort');
    }

    // Price range (only if not default)
    if (filters.priceRange.min > 0 || filters.priceRange.max < 999) {
      if (filters.priceRange.min > 0) {
        next.set('minPrice', filters.priceRange.min.toString());
      } else {
        next.delete('minPrice');
      }
      if (filters.priceRange.max < 999) {
        next.set('maxPrice', filters.priceRange.max.toString());
      } else {
        next.delete('maxPrice');
      }
    } else {
      next.delete('minPrice');
      next.delete('maxPrice');
    }

    setSearchParams(next, { replace: true });
  }, [filters, setSearchParams]);
};

export default useFiltersUrlSync;
