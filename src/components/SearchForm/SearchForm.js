import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ isLoading }) => {
  return (
    <>
      <form className="search-form" name="search-movie">
        <div className="search-form__wrapper">
          <div className="search-form__icon" />
          <input className="search-input" name="movie" placeholder="Фильм" />
          <button
            type="submit"
            className={`search-btn ${isLoading ? "search-btn_loading" : ""}`}
          />
        </div>
      </form>
      <FilterCheckbox />
    </>
  );
};

export default SearchForm;
