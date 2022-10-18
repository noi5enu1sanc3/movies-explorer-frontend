import React from "react";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://noi5enu1sanc3.github.io/how-to-learn/"
            rel="noreferrer"
            target="_blank"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://noi5enu1sanc3.github.io/russian-travel/index.html"
            rel="noreferrer"
            target="_blank"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://noi5enu1sanc3.github.io/how-to-learn/"
            rel="noreferrer"
            target="_blank"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
