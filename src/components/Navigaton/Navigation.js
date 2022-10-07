import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../images/logo.svg";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="Logo" className="nav__logo nav__link" />
      </Link>

      {isLoggedIn ? (
        <>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/movies" className="nav__movies-link nav__link">
                Фильмы
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/saved-movies" className="nav__movies-link nav__link">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link to="/profile" className="nav__profile-link nav__link">
            <span>Аккаунт</span>
            <div className='nav__profile-icon'></div>
          </Link>
        </>
      ) : (
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/signup" className="nav__signup-link nav__link">
              Регистрация
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav__signin-link nav__link">
              Войти
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
