import React from "react";

const SearchBox = ({ onQuery, query }) => {
  return (
    <div className="input-group md-form form-sm form-1 pl-0 mt-2">
      <div className="input-group-prepend">
        <span className="input-group-text purple lighten-3" id="basic-text1">
          <i className="fa fa-search " aria-hidden="true" />
        </span>
      </div>
      <input
        className="customeSearch form-control my-0 py-1"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onQuery}
        value={query}
      />
    </div>
  );
};

export default SearchBox;
