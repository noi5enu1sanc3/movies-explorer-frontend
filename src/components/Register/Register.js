import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Register = () => {
  const { values, handleChange, errors, isValid, inputsValidity } =
    useFormAndValidation();

  return (
    <main className="register">
      <Link to="/" className="register__logo-link">
        <img src={logo} alt="Logo" className="register__logo" />
      </Link>
      <h2 className="register__greeting">Добро пожаловать!</h2>
      <form className="register__form form" name="register-form" noValidate>
        <label htmlFor="register-input-name" className="register__input-label">
          Имя
        </label>
        <input
          value={values.name || ""}
          onChange={handleChange}
          className={`register__input ${
            !inputsValidity.name ? "register__input_invalid" : ""
          }`}
          id="register-input-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="register__error">{errors.name}</span>
        <label htmlFor="register-input-email" className="register__input-label">
          E-mail
        </label>
        <input
          value={values.email || ""}
          onChange={handleChange}
          className={`register__input ${
            !inputsValidity.email ? "register__input_invalid" : ""
          }`}
          id="register-input-email"
          name="email"
          type="email"
          required
        />
        <span className="register__error">{errors.email}</span>
        <label
          htmlFor="register-input-password"
          className="register__input-label"
        >
          Пароль
        </label>
        <input
          value={values.password || ""}
          onChange={handleChange}
          className={`register__input ${
            !inputsValidity.password ? "register__input_invalid" : ""
          }`}
          id="register-input-password"
          name="password"
          type="password"
          required
        />
        <span className="register__error">{errors.password}</span>
        <button
          type="submit"
          className={`register__submit-btn ${
            !isValid ? "register__submit-btn_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        <span className="register__signin-text">Уже зарегистрированы?</span>
        <Link to="/signin" className="register__signin-link">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default Register;
