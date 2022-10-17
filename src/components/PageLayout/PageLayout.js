import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavTab from "../NavTab/NavTab";

import React from "react";

const PageLayout = ({ isLoggedIn }) => {
  const location = useLocation();

  const headerVisible =
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "*";

  const footerVisible =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies";

  return (
    <>
      {headerVisible && <Header isLoggedIn={isLoggedIn} />}
      <Outlet />
      {isLoggedIn && <NavTab />}
      {footerVisible && <Footer />}
    </>
  );
};

export default PageLayout;
