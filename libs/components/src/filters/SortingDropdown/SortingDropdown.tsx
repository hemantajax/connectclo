import React from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import { SortOption } from '@connectstore/shared';
import { setSortBy, selectSortBy } from '@connectstore/store';

interface SortingDropdownProps {
  className?: string;
  variant?: 'default' | 'inline';
}

const SORT_OPTIONS = [
  { value: SortOption.ITEM_NAME, label: 'Item Name' },
  { value: SortOption.HIGHER_PRICE, label: 'Higher Price' },
  { value: SortOption.LOWER_PRICE, label: 'Lower Price' },
];

export const SortingDropdown: React.FC<SortingDropdownProps> = ({
  className = '',
  variant = 'default',
}) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectSortBy);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value as SortOption;
    dispatch(setSortBy(sortOption));
  };

  const getCurrentSortLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentSort);
    return option?.label || 'Item Name';
  };

  if (variant === 'inline') {
    const selectId = 'inline-sort-dropdown';
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <label htmlFor={selectId} className="text-light small me-2">
          Sort by
        </label>
        <select
          id={selectId}
          className="form-select form-select-sm bg-dark border-secondary text-light"
          value={currentSort}
          onChange={handleSortChange}
          style={{ width: 'auto', minWidth: '120px' }}
          aria-label="Sort products by"
        >
          {SORT_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-dark text-light"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`card card-dark ${className}`}>
      <div className="card-body">
        <h6 className="card-title text-primary mb-3">
          <i className="bi bi-sort-down me-2"></i>
          Sorting
        </h6>

        <div className="mb-3">
          <label
            htmlFor="sort-dropdown"
            className="form-label text-light small"
          >
            Sort by
          </label>
          <select
            id="sort-dropdown"
            className="form-select bg-dark border-secondary text-light"
            value={currentSort}
            onChange={handleSortChange}
            aria-describedby="sort-help"
          >
            {SORT_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-dark text-light"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex align-items-center" id="sort-help">
          <i className="bi bi-info-circle text-muted me-2"></i>
          <small className="text-muted">
            Currently sorting by: {getCurrentSortLabel()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default SortingDropdown;
