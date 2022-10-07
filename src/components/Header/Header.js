import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigaton/Navigation';
import logo from '../../images/logo.svg';
import "./Header.css";

const Header = ({ isLoggedIn }) => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === '/' ? "header_main" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Logo" className="header__nav-logo" />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
};

export default Header;
