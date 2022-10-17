import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const SearchForm = ({ isLoading }) => {
  const { values, handleChange, errors, resetForm, resetErrors, isValid } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="search">
      <form
        className="search__search-form form"
        name="search-movie"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search__search-form__wrapper">
          <button
            type="button"
            className={`search__search-form__reset-btn ${
              values.movie ? "search__search-form__reset-btn_active" : ""
            }`}
            disabled={!values.movie}
            onClick={resetForm}
          />
          <input
            className="search__search-input"
            name="movie"
            placeholder="Фильм"
            onChange={handleChange}
            value={values.movie || ""}
            onBlur={resetErrors}
            required
          />
          <span className="search__error">{errors.movie}</span>
          <button
            type="submit"
            className={`search__search-btn ${
              isLoading ? "search__search-btn_loading" : ""
            } ${!isValid ? "search__search-btn_disabled" : ""}`}
            disabled={!isValid}
          />
        </div>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
