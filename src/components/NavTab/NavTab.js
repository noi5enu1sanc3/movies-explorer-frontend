import { useEffect, useState } from "react";
import "./NavTab.css";
import "./BurgerMenu.css";
import { NavLink, useLocation } from "react-router-dom";

const NavTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavTab = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location]);

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
        <nav
          className={`nav-tab__container ${
            isOpen ? "nav-tab__container_open" : ""
          }`}
        >
          <ul className="nav-tab__list">
            <li className="nav-tab__item">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-tab__link_active nav-tab__link"
                    : "nav-tab__link"
                }
                onClick={toggleNavTab}
              >
                Главная
              </NavLink>
            </li>
            <li className="nav-tab__item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? "nav-tab__link_active nav-tab__link"
                    : "nav-tab__link"
                }
                onClick={toggleNavTab}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="nav-tab__item">
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? "nav-tab__link_active nav-tab__link"
                    : "nav-tab__link"
                }
                onClick={toggleNavTab}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "nav-tab__profile-link nav-tab__link nav-tab__profile-link_active"
                : "nav-tab__profile-link nav-tab__link"
            }
            onClick={toggleNavTab}
          >
            <span>Аккаунт</span>
            <div className="nav-tab__profile-icon"></div>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default NavTab;
