import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Profile = ({ onLogout }) => {
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { values, handleChange, errors, isValid, setValues, inputsValidity } =
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
    <main className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
      <form
        className={`profile__form form ${
          !isFormDisabled ? "profile__form_active" : ""
        }`}
        name="edit-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="profile__fieldset" disabled={isFormDisabled}>
          <label htmlFor="name-input" className="profile__input-label">
            Имя
            <input
              value={values.name || ""}
              onChange={handleChange}
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              required
              id="name-input"
              className={`profile__input ${
                inputsValidity.name === false ? "profile__input_invalid" : ""
              }`}
              ref={ref}
            />
          </label>
          <span className="profile__error">{errors.name}</span>
          <label htmlFor="email-input" className="profile__input-label">
            E-mail
            <input
              value={values.email || ""}
              onChange={handleChange}
              name="email"
              type="email"
              required
              id="email-input"
              className={`profile__input ${
                inputsValidity.email === false ? "profile__input_invalid" : ""
              }`}
            />
          </label>
          <span className="profile__error">{errors.email}</span>
        </fieldset>
        {!isFormDisabled && (
          <button
            type="submit"
            className={`profile__submit-btn ${
              !isValid ? "profile__submit-btn_disabled" : ""
            }`}
            disabled={!isValid}
          >
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
            <button
              type="button"
              className="profile__logout-btn"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default Profile;
