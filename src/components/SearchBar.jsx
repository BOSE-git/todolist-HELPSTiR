import React from 'react';

function SearchBar({ searchInput, onSearchChange, onSearchSubmit, onClear }) {
  return (
    <div className="search-container">
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={onClear}>Clear</button>
      </form>
    </div>
  );
}

export default SearchBar;
