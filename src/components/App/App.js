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
} from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccessful, setIsSuccessful] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
        localStorage.setItem("jwt", token);
      } else {
        return;
      }
      setIsLoggedIn(true);
      navigate("/movies");
      setIsSuccessful(true);
      setIsPopupOpen(true);
    } catch (err) {
      console.log(err);
      setIsSuccessful(false);
      setIsPopupOpen(true);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleTokenCheck = async () => {
    try {
      if (localStorage.getItem("jwt")) {
        const token = localStorage.getItem("jwt");
        console.log(token);
        const data = await getUserInfo(token);
        if (data) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          console.log(currentUser);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProfile = async ({ name, email }) => {
    setIsLoading(true);
    try {
      const { user } = await updateUserInfo({ name, email });
      console.log(user);
      setCurrentUser((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      console.log(currentUser);
      letDisableForm();
      setIsSuccessful(true);
      setIsPopupOpen(true);
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
      console.log("handleTokenCheck > ", isLoggedIn);
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route element={<PageLayout isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Main />} />
            <Route path="movies" element={<Movies />} />
            <Route path="saved-movies" element={<SavedMovies />} />
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
