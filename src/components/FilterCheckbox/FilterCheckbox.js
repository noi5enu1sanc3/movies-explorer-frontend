import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <div className="filter">
      <label className="filter__switch" htmlFor="filter">
        <input className="filter__input" type="checkbox" id="filter" />
        <div className="filter__slider"></div>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
