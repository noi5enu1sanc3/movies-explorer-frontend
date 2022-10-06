import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="header__nav">
      <ul>
        {isLoggedIn ? (
          <>
            <li className="header__nav-item">
              <Link to='/movies' className='header__nav-movies'></Link>
            </li>
            <li className="header__nav-item">
              <Link to='/saved-movies' className='header__nav-movies'></Link>
            </li>
            <li className="header__nav-item">
              <Link to='/profile'  className='header__nav-profile'></Link>
            </li>
          </>
        ) : (
          <>
            <li className="header__nav-item">
              <Link to="/signup" className="header__nav-signup">
                Регистрация
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/signin" className="header__nav-signin">
                Войти
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
