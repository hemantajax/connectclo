import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import {
  PricingOption,
  PriceRange,
  FILTER_CONSTANTS,
  clamp,
} from '@connectstore/shared';
import {
  setPriceRange,
  selectPriceRange,
  selectPricingOptions,
} from '@connectstore/store';

interface PricingSliderProps {
  className?: string;
}

export const PricingSlider: React.FC<PricingSliderProps> = ({
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector(selectPriceRange);
  const selectedPricingOptions = useAppSelector(selectPricingOptions);

  const [localRange, setLocalRange] = useState(priceRange);

  // Check if Paid option is selected to enable/disable slider
  const isPaidSelected = selectedPricingOptions.includes(PricingOption.PAID);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

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

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    handleMinChange(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || FILTER_CONSTANTS.PRICE_RANGE.MAX;
    handleMaxChange(value);
  };

  return (
    <div className={`card card-dark ${className}`}>
      <div className="card-body">
        <h6 className="card-title text-primary mb-3">
          <i className="bi bi-currency-dollar me-2"></i>
          Pricing Slider
        </h6>

        {!isPaidSelected && (
          <div className="alert alert-info alert-sm" role="alert">
            <small>
              <i className="bi bi-info-circle me-1"></i>
              Select "Paid" option to enable price filtering
            </small>
          </div>
        )}

        <div className={`${!isPaidSelected ? 'opacity-50' : ''}`}>
          {/* Price Range Display */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-light small">${localRange.min}</span>
            <span className="text-muted small">to</span>
            <span className="text-light small">${localRange.max}</span>
          </div>

          {/* Range Sliders */}
          <div className="position-relative mb-3">
            <input
              type="range"
              className="form-range"
              min={FILTER_CONSTANTS.PRICE_RANGE.MIN}
              max={FILTER_CONSTANTS.PRICE_RANGE.MAX}
              step={FILTER_CONSTANTS.PRICE_RANGE.STEP}
              value={localRange.min}
              onChange={(e) => handleMinChange(parseInt(e.target.value))}
              disabled={!isPaidSelected}
              style={{ position: 'absolute', zIndex: 1 }}
            />
            <input
              type="range"
              className="form-range"
              min={FILTER_CONSTANTS.PRICE_RANGE.MIN}
              max={FILTER_CONSTANTS.PRICE_RANGE.MAX}
              step={FILTER_CONSTANTS.PRICE_RANGE.STEP}
              value={localRange.max}
              onChange={(e) => handleMaxChange(parseInt(e.target.value))}
              disabled={!isPaidSelected}
              style={{ position: 'absolute', zIndex: 2 }}
            />
          </div>

          {/* Manual Input Fields */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label text-light small">Min Price</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-dark border-secondary text-light">
                  $
                </span>
                <input
                  type="number"
                  className="form-control bg-dark border-secondary text-light"
                  min={FILTER_CONSTANTS.PRICE_RANGE.MIN}
                  max={localRange.max}
                  value={localRange.min}
                  onChange={handleMinInputChange}
                  disabled={!isPaidSelected}
                />
              </div>
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Max Price</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-dark border-secondary text-light">
                  $
                </span>
                <input
                  type="number"
                  className="form-control bg-dark border-secondary text-light"
                  min={localRange.min}
                  max={FILTER_CONSTANTS.PRICE_RANGE.MAX}
                  value={localRange.max}
                  onChange={handleMaxInputChange}
                  disabled={!isPaidSelected}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSlider;
