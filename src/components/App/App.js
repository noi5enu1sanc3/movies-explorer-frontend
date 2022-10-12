import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NavTab from "../NavTab/NavTab";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import moviesDataPlaceholder from "../../utils/constants";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cards, setCards] = useState(moviesDataPlaceholder);
  const [savedCards, setSavedCards] = useState(
    moviesDataPlaceholder.filter((card) => card.isOwn)
  );

  console.log(cards);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<Movies cards={cards} />} />
        <Route
          path="saved-movies"
          element={<SavedMovies savedCards={savedCards} />}
        />
      </Routes>
      {isLoggedIn && <NavTab />}
      <Footer />
    </div>
  );
}

export default App;
