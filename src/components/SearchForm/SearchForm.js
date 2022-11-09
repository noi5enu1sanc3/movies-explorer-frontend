import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { SUBMIT_ERROR_TEXT } from "../../utils/constants";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchForm = ({
  isLoading,
  handleSearch,
  isChecked,
  searchQuery,
  setSearch,
  handleFilter,
}) => {
  const location = useLocation();

  const {
    values,
    setValues,
    handleChange,
    errors,
    resetForm,
    resetErrors,
    validateSubmit,
  } = useFormAndValidation();

  const onSearch = (evt) => {
    evt.preventDefault();

    validateSubmit(evt, SUBMIT_ERROR_TEXT);
    if (!values.movie) return;

    handleSearch(values.movie);

    resetErrors();
  };

  const handleLiveSearch = () => {
    handleSearch(values.movie);
  };

  useEffect(() => {
    setValues({ movie: searchQuery });
  }, [searchQuery, setValues]);

  return (
    <section className="search">
      <form
        className="search__search-form form"
        name="search-movie"
        onSubmit={onSearch}
        onBlur={resetErrors}
        noValidate
      >
        <div className="search__search-form__wrapper">
          <button
            type="button"
            className={`search__search-form__reset-btn ${
              values.movie ? "search__search-form__reset-btn_active" : ""
            } ${isLoading ? "search__search-form__reset-btn_loading" : ""}`}
            disabled={!values.movie || isLoading}
            onClick={resetForm}
            aria-label="Удалить введённое слово"
          />
          <input
            className="search__search-input"
            name="movie"
            placeholder="Фильм"
            onChange={handleChange}
            onKeyUp={
              location.pathname === "/saved-movies"
                ? handleLiveSearch
                : undefined
            }
            value={values.movie || ""}
            disabled={isLoading}
            required
          />
          <span className="search__input-error">{errors.movie}</span>
          <span className="search__submit-error">{errors.submit}</span>
          <button
            type="submit"
            className="search__search-btn"
            disabled={isLoading}
            aria-label="Искать"
          />
        </div>
        <FilterCheckbox
          setIsChecked={setSearch}
          isChecked={isChecked}
          handleFilter={handleFilter}
        />
      </form>
    </section>
  );
};

export default SearchForm;
