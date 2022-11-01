import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Preloader from "../Preloader/Preloader";
import { getMovies } from "../../utils/MoviesApi";
import {
  filterByQuery,
  filterByDuration,
} from "../../utils/filterSearchResults";
import { useWindowResize } from "../../hooks/useWindowResize";

const Movies = ({ savedCards }) => {
  const location = useLocation();
  const width = useWindowResize();

  const userSearch = JSON.parse(localStorage.getItem("userSearch"));

  const [movies, setMovies] = useState(userSearch ? userSearch.movies : []);
  const [isShortChecked, setIsShortChecked] = useState(
    userSearch ? userSearch.isShort : false
  );
  const [searchQuery, setSearchQuery] = useState(
    userSearch ? userSearch.query : ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (query, isShort) => {
    setIsLoading(true);

    const data = await getMovies();
    const movies = data.filter(
      (movie) =>
        (filterByQuery(movie.nameRU, query) ||
          filterByQuery(movie.nameEN, query)) &&
        (isShort ? filterByDuration(movie.duration) : movie)
    );
    setEnd(getInitialCardsCount());
    setMovies(movies);

    console.log("movies >", movies);
    console.log("cards >", cards);
    console.log("end >", end);
    const userSearch = { query: query, isShort: isShort, movies: movies };
    localStorage.setItem("userSearch", JSON.stringify(userSearch));

    setIsLoading(false);
  };

  const getInitialCardsCount = () => {
    if (width <= 767) return 5;
    if (width <= 1275) return 8;
    return 12;
  };
  const getLoadCount = () => {
    if (width <= 767) return 2;
    if (width <= 1275) return 2;
    return 3;
  };

  const [end, setEnd] = useState(getInitialCardsCount());

  const getCards = useCallback(() => movies.slice(0, end), [movies, end]);
  const [cards, setCards] = useState(getCards());

  const isLoadMoreVisible =
    location.pathname === "/movies" &&
    cards.length !== movies.length &&
    movies.length > getInitialCardsCount();

  const handleLoadMore = () => {
    setEnd(cards.length + getLoadCount());
    setCards(getCards());
  };

  // useEffect(() => {
  //   setEnd(cards.length + getLoadCount());
  //   console.log('')
  // }, [width]);

  useEffect(() => {
    setCards(getCards());
  }, [getCards]);

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
