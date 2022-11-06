import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_MOVIES_URL } from "../../utils/constants";
import { formatDuration } from "../../utils/formatDuration";

const MoviesCard = ({ card, onToggle, onDelete, savedCards }) => {
  const location = useLocation();

  const { nameRU, duration, image, trailerLink } = card;
  const formattedDuration = formatDuration(duration);
  const formattedImageUrl =
    location.pathname === "/movies" ? `${BASE_MOVIES_URL}/${image.url}` : image;

  const handleToggle = () => onToggle(card);
  const handleDelete = () => onDelete(card);

  const isSaved = savedCards.some(
    (savedCard) => savedCard.movieId === card.id || card.movieId
  );

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
          src={formattedImageUrl}
          alt={nameRU}
          className="movies-card__img"
        />
      </a>
      {location.pathname === "/movies" && (
        <button
          type="button"
          className={`movies-card__save-btn ${
            isSaved
              ? "movies-card__save-btn_type_saved"
              : "movies-card__save-btn_type_unsaved"
          }`}
          aria-label={`${isSaved ? "Удалить фильм из избранного" : ""}`}
          onClick={handleToggle}
        >{`${isSaved ? "" : "Сохранить"}`}</button>
      )}
      {location.pathname === "/saved-movies" && (
        <button
          type="button"
          className="movies-card__save-btn movies-card__save-btn_type_delete"
          onClick={handleDelete}
          aria-label="Удалить фильм из избранного"
        />
      )}
    </li>
  );
};

export default MoviesCard;
