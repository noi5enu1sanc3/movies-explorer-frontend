import React from "react";
import "./NoResults.css";
import { useLocation } from "react-router-dom";
import iconSad from "../../images/unsuccessful.svg";
import iconHappy from "../../images/successful.svg";

const NoResults = () => {
  const location = useLocation();
  const nothingSaved = location.pathname === "/saved-movies";
  const nothingFound =
    location.pathname === "/movies" && localStorage.getItem("userSearch");
  const noPreviousSearches =
    location.pathname === "/movies" && !localStorage.getItem("userSearch");

  return (
    <section className="no-results">
      {noPreviousSearches && (
        <>
          <img
            src={iconHappy}
            alt="Улыбающийся эмоджи"
            className="no-results__img no-results__img_type_no-searches"
          />
        </>
      )}
      {nothingFound && (
        <>
          <img
            src={iconSad}
            alt="Грустный эмоджи"
            className="no-results__img"
          />
          <p>По этому запросу ничего не найдено</p>
        </>
      )}
      {nothingSaved && (
        <>
          <img
            src={iconHappy}
            alt="Улыбающийся эмоджи"
            className="no-results__img"
          />
          <p>Вы ещё ничего не сохранили! Попробуйте что-нибудь поискать</p>
        </>
      )}
    </section>
  );
};

export default NoResults;
