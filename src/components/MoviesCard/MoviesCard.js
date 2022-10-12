import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

const MoviesCard = ({ card }) => {
  const { title, duration, src, isOwn } = card;
  const location = useLocation();
  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <img src={src} alt={title} className="movies-card__img" />
      {location.pathname === "/movies" && (
        <button
          className={`movies-card__save-btn ${
            isOwn
              ? "movies-card__save-btn_type_saved"
              : "movies-card__save-btn_type_unsaved"
          }`}
        >{`${isOwn ? "" : "Сохранить"}`}</button>
      )}
      {location.pathname === "/saved-movies" && (
        <button className="movies-card__save-btn movies-card__save-btn_type_delete" />
      )}
    </li>
  );
};

export default MoviesCard;
