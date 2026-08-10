import React from 'react';
import SearchBar from './SearchBar.jsx';
import HeaderActions from './HeaderActions.jsx';

export const PageHeader = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search Bar Component */}
      <SearchBar
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Notification Bell & Profile Avatar Component */}
      <HeaderActions />
    </div>
  );
};

export default PageHeader;