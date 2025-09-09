import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import {
  PricingOption,
  getPricingOptionLabel,
  FILTER_CONSTANTS,
  clamp,
} from '@connectstore/shared';
import {
  togglePricingOption,
  resetFilters,
  selectPricingOptions,
  selectIsFiltersActive,
  setPriceRange,
  selectPriceRange,
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
  const selectedOptions = useAppSelector(selectPricingOptions);
  const hasActiveFilters = useAppSelector(selectIsFiltersActive);
  const priceRange = useAppSelector(selectPriceRange);

  const [localRange, setLocalRange] = useState(priceRange);

  // Check if Paid option is selected to enable/disable slider
  const isPaidSelected = selectedOptions.includes(PricingOption.PAID);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const handleOptionToggle = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleMinChange = (value: number) => {
    const clampedValue = clamp(
      value,
      FILTER_CONSTANTS.PRICE_RANGE.MIN,
      localRange.max
    );
    const newRange = { ...localRange, min: clampedValue };
    setLocalRange(newRange);
    dispatch(setPriceRange(newRange));
  };

  const handleMaxChange = (value: number) => {
    const clampedValue = clamp(
      value,
      localRange.min,
      FILTER_CONSTANTS.PRICE_RANGE.MAX
    );
    const newRange = { ...localRange, max: clampedValue };
    setLocalRange(newRange);
    dispatch(setPriceRange(newRange));
  };

  if (variant === 'info-only') {
    return (
      <div className={`filter-info-banner ${className}`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            <span className="text-light me-4">Pricing Option</span>
            <div className="d-flex align-items-center gap-4">
              {FILTER_CONSTANTS.PRICING_OPTIONS.map((option) => {
                const isSelected = selectedOptions.includes(option);
                return (
                  <div
                    key={option}
                    className="form-check form-check-inline mb-0"
                  >
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id={`info-pricing-${option}`}
                      checked={isSelected}
                      onChange={() => handleOptionToggle(option)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor={`info-pricing-${option}`}
                    >
                      {getPricingOptionLabel(option)}
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Inline Pricing Slider */}
            <div
              className={`d-flex align-items-center ms-5 ${
                !isPaidSelected ? 'opacity-50' : ''
              }`}
            >
              <span className="text-light small me-3">${localRange.min}</span>
              <div className="position-relative me-3 inline-dual-range">
                <input
                  type="range"
                  className="form-range range-min"
                  min={FILTER_CONSTANTS.PRICE_RANGE.MIN}
                  max={FILTER_CONSTANTS.PRICE_RANGE.MAX}
                  step={FILTER_CONSTANTS.PRICE_RANGE.STEP}
                  value={localRange.min}
                  onChange={(e) =>
                    handleMinChange(
                      parseInt((e.target as HTMLInputElement).value)
                    )
                  }
                  disabled={!isPaidSelected}
                />
                <input
                  type="range"
                  className="form-range range-max"
                  min={FILTER_CONSTANTS.PRICE_RANGE.MIN}
                  max={FILTER_CONSTANTS.PRICE_RANGE.MAX}
                  step={FILTER_CONSTANTS.PRICE_RANGE.STEP}
                  value={localRange.max}
                  onChange={(e) =>
                    handleMaxChange(
                      parseInt((e.target as HTMLInputElement).value)
                    )
                  }
                  disabled={!isPaidSelected}
                />
              </div>
              <span className="text-light small">${localRange.max}</span>
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
            Contents Filter
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

        <div className="mb-3">
          <label className="form-label text-light small">Pricing Option</label>
          <div className="d-flex flex-column gap-2">
            {FILTER_CONSTANTS.PRICING_OPTIONS.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div key={option} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`pricing-${option}`}
                    checked={isSelected}
                    onChange={() => handleOptionToggle(option)}
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor={`pricing-${option}`}
                  >
                    {getPricingOptionLabel(option)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsFilter;
