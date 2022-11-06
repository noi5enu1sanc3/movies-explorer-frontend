import "./FilterCheckbox.css";

const FilterCheckbox = ({ isChecked, handleFilter }) => {
  const onFilter = () => {
    const checked = !isChecked;
    handleFilter(checked);
  };

  return (
    <div className="filter">
      <label className="filter__switch" htmlFor="filter">
        <input
          name="shortMeter"
          className={`filter__input ${
            isChecked ? "filter__input_checked" : ""
          }`}
          type="checkbox"
          id="filter"
          checked={isChecked || false}
          onChange={onFilter}
          aria-label="Только короткометражки"
        />
        <div className="filter__slider"></div>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
