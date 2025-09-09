import React from 'react';
import { useAppDispatch, useAppSelector } from '@connectstore/shared';
import { setSearchQuery, selectSearchQuery } from '@connectstore/store';
import { SearchInput } from '../SearchInput/SearchInput';

interface SearchSectionProps {
  className?: string;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <div className={`py-3 ${className}`}>
      <div className="container-fluid px-4">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Find the items you're looking for"
        />
      </div>
    </div>
  );
};

export default SearchSection;
