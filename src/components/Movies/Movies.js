import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { getMovies } from "../../utils/MoviesApi";
import {
  filterByQuery,
  filterByDuration,
} from "../../utils/filterSearchResults";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const Movies = ({ savedCards }) => {
  const location = useLocation();

  const userSearch = JSON.parse(localStorage.getItem("userSearch"));

  const [movies, setMovies] = useState(userSearch ? userSearch.movies : []);
  const [isShortChecked, setIsShortChecked] = useState(
    userSearch ? userSearch.isShort : false
  );
  const [searchQuery, setSearchQuery] = useState(
    userSearch ? userSearch.query : ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const [offset, setOffset] = useState(12);

  const cards = movies.slice(0, offset);

  const handleLoadMore = () => {
    setOffset(offset + 3);
  };

  const isLoadMoreVisible =
    location.pathname === "/movies" &&
    cards.length !== movies.length &&
    movies.length > 12;

  const handleSubmit = async (query, isShort) => {
    setIsLoading(true);

    const data = await getMovies();
    const movies = data.filter(
      (movie) =>
        (filterByQuery(movie.nameRU, query) ||
          filterByQuery(movie.nameEN, query) ||
          filterByQuery(movie.description, query) ||
          filterByQuery(movie.director, query)) &&
        (isShort ? filterByDuration(movie.duration) : movie)
    );
    setMovies(movies);
    const userSearch = { query: query, isShort: isShort, movies: movies };
    localStorage.setItem("userSearch", JSON.stringify(userSearch));
    setIsLoading(false);
  };

  return (
    <main className="movies">
      <SearchForm
        handleSubmit={handleSubmit}
        isChecked={isShortChecked}
        query={searchQuery}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList cards={cards} savedCards={savedCards} />
          {isLoadMoreVisible && <LoadMoreButton onLoadMore={handleLoadMore} />}
        </>
      )}
    </main>
  );
};

export default Movies;
