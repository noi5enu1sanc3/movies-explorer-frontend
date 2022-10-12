import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ savedCards }) => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList savedCards={savedCards} />
    </main>
  );
};

export default SavedMovies;
