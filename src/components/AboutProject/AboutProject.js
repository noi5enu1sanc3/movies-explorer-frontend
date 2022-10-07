import React from 'react';

const AboutProject = () => {
  return (
    <section className='about-project'>
      <div className='about-project__heading-container'>
        <h2 className='about-project__heading'>О проекте</h2>
      </div>
      <article className='about-project__info'>
        <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </article>
      <article className='about-project__info'>
        <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <article className='about-project__timeline'>
        <p className='about-project__timeline-time about-project__timeline-time_background-dark'>1 неделя</p>
        <p className='about-project__timeline-time about-project__timeline-time_background-light'>4 недели</p>
        <p className='about-project__timeline-text'>Backend</p>
        <p className='about-project__timeline-text'>Frontend</p>
      </article>
    </section>
  )
}

export default AboutProject;
