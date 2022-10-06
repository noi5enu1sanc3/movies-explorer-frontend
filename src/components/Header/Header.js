import React from "react";
import { Link } from 'react-router-dom';
import Navigation from '../Navigaton/Navigation';
import logo from '../../images/logo.svg';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header__nav-logo" />
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
