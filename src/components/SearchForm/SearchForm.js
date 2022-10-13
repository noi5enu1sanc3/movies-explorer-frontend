import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ isLoading }) => {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const handleIsEmpty = (evt) => {
    setIsInputEmpty(evt.target.value.length === 0);
  };
  const clearSearch = (evt) => {
    evt.target.closest(".search-form").reset();
    setIsInputEmpty(true);
  };
  return (
    <>
      <form className="search-form" name="search-movie">
        <div className="search-form__wrapper">
          <button
            type="button"
            className={`search-form__reset-btn ${
              !isInputEmpty && "search-form__reset-btn_active"
            }`}
            disabled={isInputEmpty}
            onClick={!isInputEmpty ? clearSearch : undefined}
          />
          <input
            className="search-input"
            name="movie"
            placeholder="Фильм"
            onChange={handleIsEmpty}
          />
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
