import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NavTab from "../NavTab/NavTab";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import moviesDataPlaceholder from "../../utils/constants";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState(moviesDataPlaceholder);
  const [savedCards, setSavedCards] = useState(
    moviesDataPlaceholder.filter((card) => card.isOwn)
  );

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Header isLoggedIn={isLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<Movies cards={cards} />} />
        <Route
          path="saved-movies"
          element={<SavedMovies savedCards={savedCards} />}
        />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Register />} />
      </Routes>
      {isLoggedIn && <NavTab />}
      {(location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies") && <Footer />}
    </div>
  );
}

export default App;
