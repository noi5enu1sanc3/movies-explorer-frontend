import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <main className="page-not-found">
      <p className="page-not-found__message">
        <span className="page-not-found__error">404</span>
        <span className="page-not-found__text">Страница не найдена</span>
      </p>
      <button
        className="page-not-found__go-back-btn"
        type="button"
        onClick={handleGoBack}
      >
        Назад
      </button>
    </main>
  );
};

export default PageNotFound;
