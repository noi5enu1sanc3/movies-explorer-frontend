import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import moviesDataPlaceholder from "../../utils/constants";
import PageLayout from "../PageLayout/PageLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cards, setCards] = useState(moviesDataPlaceholder);
  const [savedCards, setSavedCards] = useState(
    moviesDataPlaceholder.filter((card) => card.isOwn)
  );

  return (
    <div className="App">
      <Routes>
        <Route element={<PageLayout isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
          <Route path="movies" element={<Movies cards={cards} />} />
          <Route
            path="saved-movies"
            element={<SavedMovies savedCards={savedCards} />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Register />} />
          <Route path="signin" element={<Login />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
