import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Login = ({ onLogin, serverErrorText, isLoading }) => {
  const { values, handleChange, errors, isValid, inputsValidity } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin(values);
  };

  return (
    <main className="login">
      <Link to="/" className="login__logo-link">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h2 className="login__greeting">Рады видеть!</h2>
      <form
        className="login__form form"
        name="login-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="login-input-email" className="login__input-label">
          E-mail
        </label>
        <input
          value={values.email || ""}
          onChange={handleChange}
          className={`input login__input ${
            !inputsValidity.email ? "login__input_invalid" : ""
          }`}
          id="login-input-email"
          name="email"
          type="email"
          disabled={isLoading}
          required
        />
        <span className="login__error">{errors.email}</span>
        <label htmlFor="login-input-password" className="login__input-label">
          Пароль
        </label>
        <input
          value={values.password || ""}
          onChange={handleChange}
          className={`input login__input ${
            !inputsValidity.password ? "login__input_invalid" : ""
          }`}
          id="login-input-password"
          name="password"
          type="password"
          disabled={isLoading}
          required
        />
        <span className="login__error">{errors.password}</span>
        <button
          type="submit"
          className="login__submit-btn"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
      <p className="login__text">
        <span className="login__server-error">{serverErrorText}</span>
        <span className="login__signup-text">Ещё не зарегистрированы?</span>
        <Link to="/signup" className="login__signup-link">
          Регистрация
        </Link>
      </p>
    </main>
  );
};

export default Login;
