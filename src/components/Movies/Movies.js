import React, { useCallback, useEffect, useState, useContext } from "react";
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
import { extractFromStorage, saveToStorage } from "../../utils/storageUtils";
import { ALL_MOVIES_KEY, USER_SEARCH_KEY } from "../../utils/constants";
import {
  getInitialCardsCount,
  getLoadCount,
} from "../../utils/loadMoreLayoutUtils";

const Movies = ({ toggleMovie, savedMovies }) => {
  const location = useLocation();
  const width = useWindowResize();

  const userSearch = extractFromStorage(USER_SEARCH_KEY);

  const allMovies = extractFromStorage(ALL_MOVIES_KEY);

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

    const data = allMovies || (await getMovies());

    if (!allMovies) saveToStorage(ALL_MOVIES_KEY, data);
    const movies = data.filter(
      (movie) =>
        (filterByQuery(movie.nameRU, query) ||
          filterByQuery(movie.nameEN, query)) &&
        (isShort ? filterByDuration(movie.duration) : movie) //TODO let search with diacrits, e.g. bjork
    );
    setEnd(getInitialCardsCount(width));
    setMovies(movies);

    const userSearch = { query: query, isShort: isShort, movies: movies };

    saveToStorage(USER_SEARCH_KEY, userSearch);

    setIsLoading(false);
  };

  // const getInitialCardsCount = () => {
  //   if (width <= 767) return 5;
  //   if (width <= 1275) return 8;
  //   return 12;
  // };
  // const getLoadCount = () => {
  //   if (width <= 767) return 2;
  //   if (width <= 1275) return 2;
  //   return 3;
  // };

  const [end, setEnd] = useState(getInitialCardsCount(width));

  const getCards = useCallback(() => movies.slice(0, end), [movies, end]);
  const [cards, setCards] = useState(getCards());

  const isLoadMoreVisible =
    location.pathname === "/movies" &&
    cards.length !== movies.length &&
    movies.length > getInitialCardsCount(width);

  const handleLoadMore = () => {
    setEnd(cards.length + getLoadCount(width));
    setCards(getCards());
  };

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
          <MoviesCardList
            cards={cards}
            onToggle={toggleMovie}
            savedCards={savedMovies}
          />
          {isLoadMoreVisible && <LoadMoreButton onLoadMore={handleLoadMore} />}
        </>
      )}
    </main>
  );
};

export default Movies;
