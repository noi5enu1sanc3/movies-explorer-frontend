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
import { extractFromStorage, saveToStorage } from "../../utils/storageUtils";
import { ALL_MOVIES_KEY, USER_SEARCH_KEY } from "../../utils/constants";
import {
  getInitialCardsCount,
  getLoadCount,
} from "../../utils/loadMoreLayoutUtils";
import handleServerErrors from "../../utils/handleServerErrors";

const Movies = ({
  toggleMovie,
  savedMovies,
  setServerError,
  serverErrorText,
}) => {
  const location = useLocation();
  const width = useWindowResize();

  const userSearch = extractFromStorage(USER_SEARCH_KEY);

  const allMovies = extractFromStorage(ALL_MOVIES_KEY);

  const [search, setSearch] = useState({
    movies: userSearch ? userSearch.movies : [],
    searchQuery: userSearch ? userSearch.query : "",
    isShortChecked: userSearch ? userSearch.isShortChecked : false,
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState(getInitialCardsCount(width));

  const handleSearch = async (query) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = allMovies || (await getMovies());

      if (!allMovies) saveToStorage(ALL_MOVIES_KEY, data);

      const movies = data.filter(
        (movie) =>
          filterByQuery([movie.nameRU, movie.nameEN], query) &&
          (search.isShortChecked ? filterByDuration(movie.duration) : movie)
      );
      setEnd(getInitialCardsCount(width));
      setSearch((state) => {
        return { ...state, movies: movies, searchQuery: query };
      });

      const userSearch = {
        query: query,
        movies: movies,
        isShortChecked: search.isShortChecked,
      };
      saveToStorage(USER_SEARCH_KEY, userSearch);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setServerError(handleServerErrors(err.status));
    }
    setIsLoading(false);
  };

  const handleFilter = (isShort) => {
    if (allMovies) {
      const movies = allMovies.filter(
        (movie) =>
          filterByQuery([movie.nameRU, movie.nameEN], search.searchQuery) &&
          (isShort ? filterByDuration(movie.duration) : movie)
      );
      setEnd(getInitialCardsCount(width));
      setSearch((state) => {
        return { ...state, movies: movies, isShortChecked: isShort };
      });
      const userSearch = {
        query: search.searchQuery,
        movies: movies,
        isShortChecked: isShort,
      };
      saveToStorage(USER_SEARCH_KEY, userSearch);
    }
  };

  const getCards = useCallback(
    () => search.movies.slice(0, end),
    [search, end]
  );
  const [cards, setCards] = useState(getCards());

  const isLoadMoreVisible =
    location.pathname === "/movies" &&
    cards.length !== search.movies.length &&
    search.movies.length > getInitialCardsCount(width) &&
    !isError;

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
        handleSearch={handleSearch}
        isChecked={search.isShortChecked}
        setSearch={setSearch}
        searchQuery={search.searchQuery}
        handleFilter={handleFilter}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            cards={cards}
            onToggle={toggleMovie}
            savedCards={savedMovies}
            serverErrorText={serverErrorText}
            isError={isError}
          />
          {isLoadMoreVisible && <LoadMoreButton onLoadMore={handleLoadMore} />}
        </>
      )}
    </main>
  );
};

export default Movies;
