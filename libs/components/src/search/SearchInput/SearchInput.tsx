import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@connectstore/shared';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const isClearing = useRef(false);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Call onChange when debounced value changes
  useEffect(() => {
    // Skip debounced update if we're in the middle of a clear action
    if (isClearing.current) {
      isClearing.current = false;
      return;
    }

    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleClear = () => {
    isClearing.current = true;
    setLocalValue('');
    // Call onChange immediately to bypass debounce for clear action
    onChange('');
  };

  return (
    <div className="position-relative">
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
        className={`form-control bg-dark text-light ${
          isFocused ? 'border-primary' : 'border-secondary'
        } ${className}`}
        placeholder={placeholder}
        value={localValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLocalValue(e.currentTarget.value);
        }}
        style={{
          paddingLeft: '48px',
          paddingRight: localValue ? '48px' : '16px',
          height: '48px',
          fontSize: '16px',
          borderRadius: '8px',
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
  );
};

export default SearchInput;
