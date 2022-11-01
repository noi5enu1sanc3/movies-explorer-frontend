import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import PageLayout from "../PageLayout/PageLayout";
import { getUserInfo, login, register } from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({ name, email, password }) => {
    setIsLoading(true);
    console.log({ name, email, password });
    try {
      await register({ name, email, password });
      handleLogin({ email, password });
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
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
        const userInfo = getUserInfo(token);
        if (userInfo) {
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) console.log("handleTokenCheck > ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route element={<PageLayout isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
          <Route path="movies" element={<Movies />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="profile" element={<Profile onLogout={handleLogout} />} />
          <Route
            path="signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="signin" element={<Login onLogin={handleLogin} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
