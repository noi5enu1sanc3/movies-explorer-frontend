import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../images/logo.svg";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link nav__logo-link">
        <img src={logo} alt="Логотип" className="nav__logo" />
      </Link>

      {isLoggedIn ? (
        <>
          <ul className="nav__list nav__list_type_user nav__list_type_desktop">
            <li className="nav__item">
              <NavLink
                to="movies"
                className={({ isActive }) =>
                  isActive
                    ? "nav__movies-link nav__link nav__movies-link_active"
                    : "nav__movies-link nav__link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? "nav__movies-link nav__link nav__movies-link_active"
                    : "nav__movies-link nav__link"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link
            to="profile"
            className="nav__profile-link nav__link nav__profile-link_type_desktop"
          >
            <span>Аккаунт</span>
            <div className="nav__profile-icon"></div>
          </Link>
        </>
      ) : (
        <ul className="nav__list nav__list_type_guest">
          <li className="nav__item">
            <Link to="signup" className="nav__signup-link nav__link">
              Регистрация
            </Link>
          </li>
          <li className="nav-item">
            <Link to="signin" className="nav__signin-link nav__link">
              Войти
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
