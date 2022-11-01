import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { SUBMIT_ERROR_TEXT } from "../../utils/constants";
import { useEffect } from "react";

const SearchForm = ({ isLoading, handleSubmit, isChecked, query }) => {
  const {
    values,
    checkboxValues,
    setValues,
    setCheckBoxValues,
    handleCheckBox,
    handleChange,
    errors,
    resetForm,
    resetErrors,
    validateSubmit,
    isValid,
  } = useFormAndValidation();

  const onSubmit = (evt) => {
    evt.preventDefault();

    validateSubmit(evt, SUBMIT_ERROR_TEXT);
    if (!isValid) return;

    const query = values.movie;
    const filter = checkboxValues.shortMeter;

    handleSubmit(query, filter);
    resetErrors();
  };

  const onReset = () => {
    resetForm();
    setCheckBoxValues({ shortMeter: false });
    console.log(checkboxValues);
  };

  useEffect(() => {
    setValues({ movie: query });
    setCheckBoxValues({ shortMeter: isChecked });
  }, []);

  return (
    <section className="search">
      <form
        className="search__search-form form"
        name="search-movie"
        onSubmit={onSubmit}
        onBlur={resetErrors}
        noValidate
      >
        <div className="search__search-form__wrapper">
          <button
            type="button"
            className={`search__search-form__reset-btn ${
              values.movie ? "search__search-form__reset-btn_active" : ""
            }`}
            disabled={!values.movie}
            onClick={onReset}
          />
          <input
            className="search__search-input"
            name="movie"
            placeholder="Фильм"
            onChange={handleChange}
            value={values.movie || ""}
            required
          />
          <span className="search__input-error">{errors.movie}</span>
          <span className="search__submit-error">{errors.submit}</span>
          <button
            type="submit"
            className={`search__search-btn ${
              isLoading ? "search__search-btn_loading" : ""
            }`}
          />
        </div>
      </form>
      <FilterCheckbox
        handleCheck={handleCheckBox}
        isChecked={checkboxValues.shortMeter}
      />
    </section>
  );
};

export default SearchForm;
