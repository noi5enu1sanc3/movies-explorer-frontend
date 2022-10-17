import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({ isLoading, cards, savedCards }) => {
  const location = useLocation();

  return (
    <>
      {isLoading && <Preloader />}
      {location.pathname === "/movies" ? (
        <section className="movies-section">
          {cards.length === 0 ? (
            <NoResults />
          ) : (
            <ul className="movies-card-list">
              {cards.map((card) => (
                <MoviesCard key={card.id} card={card} />
              ))}
            </ul>
          )}
          {cards.length !== 0 && (
            <button className="movies-section__load-more-btn">Ещё</button>
          )}
        </section>
      ) : (
        <section className="movies-section">
          {savedCards.length === 0 ? (
            <NoResults />
          ) : (
            <ul className="movies-card-list">
              {savedCards.map((card) => (
                <MoviesCard key={card.id} card={card} />
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
};

export default MoviesCardList;
