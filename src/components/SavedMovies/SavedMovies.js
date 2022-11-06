import { useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {
  filterByDuration,
  filterByQuery,
} from "../../utils/filterSearchResults";

const SavedMovies = ({ savedMovies, deleteMovie }) => {
  const [visibleSavedMovies, setVisibleSavedMovies] = useState(savedMovies);
  const [filterShort, setFilterShort] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const handleSearch = (query) => {
    const filteredMovies = savedMovies.filter((movie) =>
      filterByQuery([movie.nameRU, movie.nameEN], query)
    );
    setSearchedMovies(filteredMovies);
  };

  const handleFilter = () => setFilterShort(!filterShort);

  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (filterShort) {
      const shorts = searchedMovies.filter((movie) =>
        filterByDuration(movie.duration)
      );
      setVisibleSavedMovies(shorts);
    } else setVisibleSavedMovies(searchedMovies);
  }, [filterShort, searchedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        isChecked={filterShort}
      />
      <MoviesCardList savedCards={visibleSavedMovies} onDelete={deleteMovie} />
    </main>
  );
};

export default SavedMovies;
