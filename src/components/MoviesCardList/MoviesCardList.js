import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import NoResults from "../NoResults/NoResults";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({
  cards,
  savedCards,
  onToggle,
  onDelete,
  serverErrorText,
  isError,
}) => {
  const location = useLocation();

  if (isError)
    return <span className="movies__server-error-text">{serverErrorText}</span>;

  return (
    <>
      {location.pathname === "/movies" ? (
        <section className="movies-section">
          {cards.length === 0 ? (
            <NoResults />
          ) : (
            <ul className="movies-card-list">
              {cards.map((card) => (
                <MoviesCard
                  key={card.id}
                  card={card}
                  onToggle={onToggle}
                  savedCards={savedCards}
                />
              ))}
            </ul>
          )}
        </section>
      ) : (
        <section className="movies-section">
          {savedCards.length === 0 || !savedCards ? (
            <NoResults />
          ) : (
            <ul className="movies-card-list">
              {savedCards.map((card) => (
                <MoviesCard
                  key={card._id}
                  card={card}
                  onDelete={onDelete}
                  savedCards={savedCards}
                />
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
};

export default MoviesCardList;
