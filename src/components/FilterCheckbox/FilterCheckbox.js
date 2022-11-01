import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ handleCheck, isChecked }) => {
  return (
    <div className="filter">
      <label className="filter__switch" htmlFor="filter" onChange={handleCheck}>
        <input
          name="shortMeter"
          className={`filter__input ${
            isChecked ? "filter__input_checked" : ""
          }`}
          type="checkbox"
          id="filter"
          defaultChecked={isChecked}
        />
        <div className="filter__slider"></div>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
