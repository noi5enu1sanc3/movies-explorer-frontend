import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = ({ cards, savedCards }) => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} savedCards={savedCards} />
    </main>
  );
};

export default Movies;
