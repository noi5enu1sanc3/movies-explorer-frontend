import React from "react";
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigaton/Navigation';
import "./Header.css";

const Header = ({ isLoggedIn }) => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === '/' ? "header_main" : ""}`}>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
};

export default Header;
