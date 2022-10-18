import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavTab from "../NavTab/NavTab";
import Popup from "../Popup/Popup";

const PageLayout = ({ isLoggedIn }) => {
  const location = useLocation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
      {isLoggedIn && <NavTab />}
      {footerVisible && <Footer />}
    </>
  );
};

export default PageLayout;
