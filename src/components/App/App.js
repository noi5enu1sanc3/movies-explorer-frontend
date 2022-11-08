import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
  USER_MOVIES_KEY,
  STORE_KEY,
  PROFILE_EDIT_SUCCESS_TEXT,
  LOGIN_SUCCESS_TEXT,
  MOVIEAPI_ERROR_TEXT,
} from "../../utils/constants";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import handleServerErrors from "../../utils/handleServerErrors";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(extractFromStorage(JWT_KEY));
  const [isLoading, setIsLoading] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [popupMessageText, setPopupMessageText] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState({
    login: "",
    register: "",
    profile: "",
  });

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const addUserMovie = async (toggledMovie) => {
    setIsLoading(true);
    try {
      const { movie } = await addMovie(toggledMovie);
      setSavedMovies((state) => [...state, movie]);

      const userMovies = extractFromStorage(USER_MOVIES_KEY);
      userMovies.push(movie);
      saveToStorage(USER_MOVIES_KEY, userMovies);
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setPopupMessageText(MOVIEAPI_ERROR_TEXT);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const deleteUserMovie = async (toggledMovie) => {
    setIsLoading(true);
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
      const userMovies = extractFromStorage(USER_MOVIES_KEY);

      const newUserMovies = userMovies.filter(
        (m) => m.movieId !== movie.movieId
      );
      saveToStorage(USER_MOVIES_KEY, newUserMovies);
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setPopupMessageText(MOVIEAPI_ERROR_TEXT);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const handleToggleMovie = (toggledMovie) => {
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
    setTimeout(() => handleClosePopup(), 1000);
  };

  const handleRegister = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await register({ name, email, password });
      setIsSuccessful(true);
      setServerError(prev => {
        return {
        ...prev,
        register: "",
      }});
      handleLogin({ email, password });
    } catch (err) {
      console.log(err);
      setServerError(prev => {
        return {
        ...prev,
        register: handleServerErrors(err.status),
      }});
    }
  };

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { token } = await login({ email, password });
      if (token) {
        saveToStorage(JWT_KEY, token);
      } else {
        return;
      }
      setIsLoggedIn(true);
      setServerError(prev => {
        return {
        ...prev,
        login: "",
      }});
      openPopup();
      navigate("/movies");
      setIsSuccessful(true);
      setPopupMessageText(LOGIN_SUCCESS_TEXT);
      setIsPopupOpen(true);
    } catch (err) {
      console.log(err);
      setServerError(prev => {
        return {
        ...prev,
        login: handleServerErrors(err.status),
      }});
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    clearStorage(STORE_KEY);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleTokenCheck = async () => {
    try {
      const token = extractFromStorage(JWT_KEY);

      if (token) {
        const { user } = await checkToken(token);
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser(user);
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
      setCurrentUser((state) => ({
        ...state,
        name: user.name,
        email: user.email,
      }));
      setServerError(prev => {
        return {
        ...prev,
        profile: "",
      }});
      setIsFormDisabled(true);
      setIsSuccessful(true);
      setPopupMessageText(PROFILE_EDIT_SUCCESS_TEXT);
      openPopup();
    } catch (err) {
      console.log(err);
      setServerError(prev => {
        return {
        ...prev,
        profile: handleServerErrors(err.status),
      }});
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const userMovies = extractFromStorage(USER_MOVIES_KEY);

      if (userMovies) {
        setSavedMovies(userMovies);
      } else {
        const loadUserAndMovies = async () => {
          const [{ user }, { movies }] = await Promise.all([
            getUserInfo(),
            getSavedMovies(),
          ]);
          setCurrentUser(user);
          setSavedMovies(movies);
          saveToStorage(USER_MOVIES_KEY, movies);
        };
        try {
          loadUserAndMovies();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [isLoggedIn, currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route element={<PageLayout isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Main />} />
            <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
              <Route
                path="movies"
                element={
                  <Movies
                    toggleMovie={handleToggleMovie}
                    savedMovies={savedMovies}
                    serverErrorText={serverError}
                    setServerError={setServerError}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                }
              />
              <Route
                path="saved-movies"
                element={
                  <SavedMovies
                    savedMovies={savedMovies}
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
                    isFormDisabled={isFormDisabled}
                    setIsFormDisabled={setIsFormDisabled}
                    setServerError={setServerError}
                    serverErrorText={serverError.profile}
                    isLoading={isLoading}
                  />
                }
              />
            </Route>
            <Route
              path="signup"
              element={
                !isLoggedIn ? (
                  <Register
                    onRegister={handleRegister}
                    setServerError={setServerError}
                    serverErrorText={serverError.register}
                    isLoading={isLoading}
                  />
                ) : (
                  <Navigate to="/movies" />
                )
              }
            />
            <Route
              path="signin"
              element={
                !isLoggedIn ? (
                  <Login
                    onLogin={handleLogin}
                    setServerError={setServerError}
                    serverErrorText={serverError.login}
                    isLoading={isLoading}
                  />
                ) : (
                  <Navigate to="/movies" />
                )
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          isSuccessful={isSuccessful}
          popupMessageText={popupMessageText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
