import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Profile = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const ref = useRef(null);

  const enableEdit = () => {
    setIsFormDisabled(false);
    setTimeout(() => ref.current.focus(), 50);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setValues(values);
    setIsFormDisabled(true);
  };

  return (
    <section className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
      <form
        className={`profile__edit-form form ${
          !isFormDisabled && "profile__edit-form_active"
        }`}
        name="edit-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="profile__fieldset" disabled={isFormDisabled}>
          <label htmlFor="name-input" className="profile__input-label">
            Имя
            <input
              value={values.name || ""}
              onChange={handleChange}
              name="name"
              id="name-input"
              className="profile__edit-input"
              ref={ref}
            />
          </label>
          <label htmlFor="email-input" className="profile__input-label">
            E-mail
            <input
              value={values.email || ""}
              onChange={handleChange}
              name="email"
              id="email-input"
              className="profile__edit-input"
            />
          </label>
        </fieldset>
        {!isFormDisabled && (
          <button type="submit" className="profile__submit-btn">
            Сохранить
          </button>
        )}
      </form>
      <div className="profile__buttons-wrapper">
        {isFormDisabled && (
          <>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={enableEdit}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__logout-link">
              Выйти из аккаунта
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
