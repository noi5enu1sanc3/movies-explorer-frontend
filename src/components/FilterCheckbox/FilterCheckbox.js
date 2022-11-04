import React, { useEffect, useState } from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ isChecked, handleFilter }) => {
  //const [isOn, setIsOn] = useState(isChecked);
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
          //defaultChecked={isChecked}
          checked={isChecked || false}
          onChange={onFilter}
        />
        <div className="filter__slider"></div>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
