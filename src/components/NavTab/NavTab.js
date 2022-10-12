import React, { useState } from "react";
import "./NavTab.css";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";

const NavTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavTab = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <label
        htmlFor="burger-menu"
        className="burger-menu"
        onClick={toggleNavTab}
      >
        <input className="burger-menu__input" id="burger-menu__input" />
        <span
          className={`burger-menu__element ${
            isOpen ? "burger-menu__element_type_close" : ""
          }`}
        />
      </label>
      <div className={`nav-tab ${isOpen ? "nav-tab_open" : ""}`}>
        <div className="nav-tab__container">
          <ul className="nav-tab__list">
            <li className="nav-tab__item">
              <Link to="/" className="nav-tab__link" onClick={toggleNavTab}>
                Главная
              </Link>
            </li>
            <li className="nav-tab__item">
              <Link
                to="/movies"
                className="nav-tab__link"
                onClick={toggleNavTab}
              >
                Фильмы
              </Link>
            </li>
            <li className="nav-tab__item">
              <Link
                to="/saved-movies"
                className="nav-tab__link"
                onClick={toggleNavTab}
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link
            to="/profile"
            className="nav-tab__profile-link nav-tab__link"
            onClick={toggleNavTab}
          >
            <span>Аккаунт</span>
            <div className="nav-tab__profile-icon"></div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavTab;
