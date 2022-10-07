import React from "react";
import photoPlaceholder from "../../images/about-me-placeholder.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__heading-container">
        <h2 className="about-me__heading">Студент</h2>
      </div>
      <article className="about-me__info">
        <div className="about-me__intro">
          <h3 className="about-me__subtitle">Соня</h3>
          <p className="about-me__job">Фронтенд-разработчик</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <a href='https://github.com/noi5enu1sanc3' className='about-me__link' target='_blank' rel="noreferrer">Github</a>
        <img src={photoPlaceholder} alt="Соня" className="about-me__photo" />
      </article>
    </section>
  );
};

export default AboutMe;
