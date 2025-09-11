import React from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import { FILTER_CONSTANTS } from '@connectstore/shared';
import {
  toggleCategory,
  setMinRating,
  resetFilters,
  selectCategories,
  selectMinRating,
  selectIsFiltersActive,
} from '@connectstore/store';

interface ContentsFilterProps {
  className?: string;
  variant?: 'default' | 'info-only';
}

export const ContentsFilter: React.FC<ContentsFilterProps> = ({
  className = '',
  variant = 'default',
}) => {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(selectCategories);
  const minRating = useAppSelector(selectMinRating);
  const hasActiveFilters = useAppSelector(selectIsFiltersActive);

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const handleRatingChange = (rating: number) => {
    dispatch(setMinRating(rating));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Helper function to format category names for display
  const formatCategoryName = (category: string) => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // const handleMinChange = (value: number) => {
  //   const clampedValue = clamp(
  //     value,
  //     FILTER_CONSTANTS.PRICE_RANGE.MIN,
  //     localRange.max
  //   );
  //   const newRange = { ...localRange, min: clampedValue };
  //   setLocalRange(newRange);
  //   dispatch(setPriceRange(newRange));
  // };

  // const handleMaxChange = (value: number) => {
  //   const clampedValue = clamp(
  //     value,
  //     localRange.min,
  //     FILTER_CONSTANTS.PRICE_RANGE.MAX
  //   );
  //   const newRange = { ...localRange, max: clampedValue };
  //   setLocalRange(newRange);
  //   dispatch(setPriceRange(newRange));
  // };

  if (variant === 'info-only') {
    return (
      <div className={`filter-info-banner ${className}`}>
        <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-3">
          {/* Categories */}
          <div className="d-flex align-items-center">
            <span className="text-light me-3">Category:</span>
            <div className="d-flex align-items-center gap-3">
              {FILTER_CONSTANTS.CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <div
                    key={category}
                    className="form-check form-check-inline mb-0"
                  >
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id={`info-category-${category}`}
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(category)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor={`info-category-${category}`}
                    >
                      {formatCategoryName(category)}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={handleReset}
            >
              RESET
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`card card-dark ${className}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="card-title text-primary mb-0">
            <i className="bi bi-funnel me-2"></i>
            Product Filters
          </h6>
          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Reset
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-3">
          <label className="form-label text-light small">Category</label>
          <div className="d-flex flex-column gap-2">
            {FILTER_CONSTANTS.CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <div key={category} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`category-${category}`}
                    checked={isSelected}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor={`category-${category}`}
                  >
                    {formatCategoryName(category)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-3">
          <label className="form-label text-light small">
            Minimum Rating: {minRating > 0 ? `${minRating}+ stars` : 'Any'}
          </label>
          <input
            type="range"
            className="form-range"
            min={FILTER_CONSTANTS.RATING.MIN}
            max={FILTER_CONSTANTS.RATING.MAX}
            step={FILTER_CONSTANTS.RATING.STEP}
            value={minRating}
            onChange={(e) => handleRatingChange(Number(e.target.value))}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>Any</span>
            <span>5 stars</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsFilter;
