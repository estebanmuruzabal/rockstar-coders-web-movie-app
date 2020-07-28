import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    props.handleSearchInputChanges(e.target.value);
  }

  return (
      <div className="search-box-container">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          className="search-box-container_search-input"
          placeholder="Search for a movie..."
          type="text"
        />
      </div>
    );
}

export default Search;