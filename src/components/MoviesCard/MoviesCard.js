import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_MOVIES_URL } from "../../utils/constants";
import { formatDuration } from "../../utils/formatDuration";

const MoviesCard = ({ card }) => {
  const { nameRU, duration, image, trailerLink, isOwn = false } = card;
  const formattedDuration = formatDuration(duration);

  const location = useLocation();
  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h2 className="movies-card__title">{nameRU}</h2>
        <p className="movies-card__duration">{formattedDuration}</p>
      </div>
      <a
        href={trailerLink}
        className="movies-card__trailer-link"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src={`${BASE_MOVIES_URL}/${image.url}`}
          alt={nameRU}
          className="movies-card__img"
        />
      </a>
      {location.pathname === "/movies" && (
        <button
          type="button"
          className={`movies-card__save-btn ${
            isOwn
              ? "movies-card__save-btn_type_saved"
              : "movies-card__save-btn_type_unsaved"
          }`}
        >{`${isOwn ? "" : "Сохранить"}`}</button>
      )}
      {location.pathname === "/saved-movies" && (
        <button
          type="button"
          className="movies-card__save-btn movies-card__save-btn_type_delete"
        />
      )}
    </li>
  );
};

export default MoviesCard;
