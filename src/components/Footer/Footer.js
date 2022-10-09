import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__credits">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links-list">
          <li className="footer__links-list-item">
            <a
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-list-item">
            <a
              href="https://github.com/noi5enu1sanc3"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
