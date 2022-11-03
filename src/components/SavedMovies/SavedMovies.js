import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ movies, deleteMovie }) => {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList savedCards={movies} onDelete={deleteMovie} />
    </main>
  );
};

export default SavedMovies;
