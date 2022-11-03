import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Popup from "../Popup/Popup";
import PageLayout from "../PageLayout/PageLayout";
import {
  getUserInfo,
  login,
  register,
  updateUserInfo,
  getSavedMovies,
  addMovie,
  deleteMovie,
  checkToken,
} from "../../utils/MainApi";
import {
  saveToStorage,
  extractFromStorage,
  clearStorage,
} from "../../utils/storageUtils";
import {
  JWT_KEY,
  ALL_MOVIES_KEY,
  USER_MOVIES_KEY,
  USER_SEARCH_KEY,
  STORE_KEY,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccessful, setIsSuccessful] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const addUserMovie = async (toggledMovie) => {
    try {
      const { movie } = await addMovie(toggledMovie);
      setSavedMovies((state) => [...state, movie]);

      // const userMovies = JSON.parse(localStorage.getItem("userMovies"));
      const userMovies = extractFromStorage(USER_MOVIES_KEY);
      userMovies.push(movie);
      // localStorage.setItem("userMovies", JSON.stringify(userMovies));
      saveToStorage(USER_MOVIES_KEY, userMovies);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserMovie = async (toggledMovie) => {
    try {
      const movieToDelete = savedMovies.find(
        (movie) =>
          (toggledMovie.id || toggledMovie.movieId) ===
          (movie.movieId || movie.id)
      );

      const { movie } = await deleteMovie(movieToDelete._id);

      setSavedMovies((state) =>
        state.filter((m) => m.movieId !== movie.movieId)
      );
      // const userMovies = JSON.parse(localStorage.getItem("userMovies"));
      const userMovies = extractFromStorage(USER_MOVIES_KEY);

      const newUserMovies = userMovies.filter(
        (m) => m.movieId !== movie.movieId
      );
      // localStorage.setItem("userMovies", JSON.stringify(newUserMovies));
      saveToStorage(USER_MOVIES_KEY, newUserMovies);
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setIsPopupOpen(true);
    }
  };

  const handleToggleMovie = (toggledMovie) => {
    // const userMovies = JSON.parse(localStorage.getItem("userMovies"));
    const userMovies = extractFromStorage(USER_MOVIES_KEY);

    // if (userMovies.some((movie) => movie.movieId === toggledMovie.id)) {
    if (savedMovies.some((movie) => movie.movieId === toggledMovie.id)) {
      deleteUserMovie(toggledMovie);
    } else {
      addUserMovie(toggledMovie);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupOpen(false), 1500);
  };

  const handleRegister = async ({ name, email, password }) => {
    setIsLoading(true);
    console.log({ name, email, password });
    try {
      await register({ name, email, password });
      handleLogin({ email, password });
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    console.log({ email, password });
    try {
      const { token } = await login({ email, password });
      if (token) {
        // localStorage.setItem("jwt", token);
        saveToStorage(JWT_KEY, token);
      } else {
        return;
      }
      setIsLoggedIn(true);
      openPopup();
      navigate("/movies");
      setIsPopupOpen(true);
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    // localStorage.removeItem("jwt");
    clearStorage(STORE_KEY);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleTokenCheck = async () => {
    try {
      // const token = localStorage.getItem("jwt");
      const token = extractFromStorage(JWT_KEY);

      if (token) {
        console.log(token);
        const data = await checkToken(token);
        if (data) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          console.log(currentUser);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  };

  const handleUpdateProfile = async ({ name, email }) => {
    setIsLoading(true);
    try {
      const { user } = await updateUserInfo({ name, email });
      console.log(user);
      setCurrentUser((state) => ({
        ...state,
        name: user.name,
        email: user.email,
      }));
      console.log(currentUser);
      letDisableForm();
      setIsSuccessful(true);
      openPopup();
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const [isProfileEditSuccessful, setIsProfileEditSuccessful] = useState(false);

  const letDisableForm = () => {
    setIsProfileEditSuccessful(true);
  };

  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) {
      console.log("handleTokenCheck, logged in > ", isLoggedIn);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // const userMovies = JSON.parse(localStorage.getItem("userMovies"));
    const userMovies = extractFromStorage(USER_MOVIES_KEY);

    if (userMovies) {
      setSavedMovies(userMovies);
    } else {
      const loadSavedMovies = async () => {
        const { movies } = await getSavedMovies();
        setSavedMovies(movies);
        // localStorage.setItem("userMovies", JSON.stringify(movies));
        saveToStorage(USER_MOVIES_KEY, movies);
      };
      try {
        loadSavedMovies();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route element={<PageLayout isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Main />} />
            <Route
              path="movies"
              element={
                <Movies
                  toggleMovie={handleToggleMovie}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path="saved-movies"
              element={
                <SavedMovies
                  movies={savedMovies}
                  deleteMovie={deleteUserMovie}
                />
              }
            />
            <Route
              path="profile"
              element={
                <Profile
                  onLogout={handleLogout}
                  onUpdateProfile={handleUpdateProfile}
                  onSuccess={isProfileEditSuccessful}
                />
              }
            />
            <Route
              path="signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="signin" element={<Login onLogin={handleLogin} />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          isSuccessful={isSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
