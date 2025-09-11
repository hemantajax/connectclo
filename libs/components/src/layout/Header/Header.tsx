import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import { setSearchQuery, selectSearchQuery } from '@connectstore/store';
import { useDebounce } from '@connectstore/shared';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [localValue, setLocalValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const isClearing = React.useRef(false);
  const debouncedValue = useDebounce(localValue, 300);

  // Update local value when search query prop changes
  React.useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  // Handle debounced search updates (with clear bypass)
  React.useEffect(() => {
    // Skip debounced update if we're in the middle of a clear action
    if (isClearing.current) {
      isClearing.current = false;
      return;
    }

    // Only propagate when the debounced value reflects the local input state
    // and differs from the external value (prevents echoing prop changes back)
    if (debouncedValue === localValue && debouncedValue !== searchQuery) {
      dispatch(setSearchQuery(debouncedValue));
    }
  }, [debouncedValue, localValue, dispatch, searchQuery]);

  const handleClear = () => {
    isClearing.current = true;
    setLocalValue('');
    // Call dispatch immediately to bypass debounce for clear action
    dispatch(setSearchQuery(''));
  };

  const logoStyle: React.CSSProperties = {
    background:
      'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #00d2ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.8rem',
    fontWeight: '900',
    letterSpacing: '0.1em',
    textShadow: '0 0 30px rgba(0, 210, 255, 0.3)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textTransform: 'uppercase' as const,
  };

  return (
    <header role="banner">
      <nav
        className={`navbar navbar-dark navbar-dark-custom navbar-expand-lg py-3 fixed-top ${className}`}
        aria-label="Main navigation"
      >
        <div className="container-fluid px-4">
          {/* Logo/Brand */}
          <div className="navbar-brand d-flex align-items-center me-4">
            <span style={logoStyle} className="d-inline-block">
              H<span style={{ color: '#00ff88' }}>CONNECT</span>
            </span>
          </div>

          {/* Search Input - Responsive */}
          <div className="flex-grow-1 d-flex justify-content-center px-3">
            <div
              className="position-relative w-100"
              style={{ maxWidth: '600px' }}
            >
              <i
                className="bi bi-search position-absolute text-light opacity-75"
                style={{
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  fontSize: '18px',
                }}
              ></i>
              <input
                type="text"
                className={`form-control bg-dark text-light w-100 ${
                  isFocused ? 'border-primary' : 'border-secondary'
                }`}
                placeholder="Find the items you're looking for..."
                value={localValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLocalValue(e.currentTarget.value);
                }}
                aria-label="Search products"
                aria-describedby={localValue ? 'search-clear' : undefined}
                role="searchbox"
                style={{
                  paddingLeft: '48px',
                  paddingRight: localValue ? '48px' : '16px',
                  height: '45px',
                  fontSize: '16px',
                  borderRadius: '25px',
                  borderWidth: '1px',
                  outline: 'none',
                  transition:
                    'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  boxShadow: isFocused
                    ? '0 0 0 0.2rem rgba(0, 212, 255, 0.25)'
                    : 'none',
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {localValue && (
                <button
                  type="button"
                  className="btn position-absolute border-0 bg-transparent text-light opacity-75"
                  onClick={handleClear}
                  aria-label="Clear search"
                  id="search-clear"
                  style={{
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 5,
                    padding: '4px 8px',
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
