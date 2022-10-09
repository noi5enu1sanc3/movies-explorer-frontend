import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__heading'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link'>
            <p className='portfolio__link-text'>Статичный сайт</p>
            {/* TODO: arrow after */}
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            {/* TODO: arrow after */}
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            {/* TODO: arrow after */}
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
