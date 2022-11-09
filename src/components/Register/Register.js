import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Register = ({
  onRegister,
  serverErrorText,
  isLoading,
  setServerError,
}) => {
  const { values, handleChange, errors, isValid, inputsValidity } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    setServerError((prev) => {
      return {
        ...prev,
        register: "",
      };
    });
  }, []);

  return (
    <main className="register">
      <Link to="/" className="register__logo-link">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h2 className="register__greeting">Добро пожаловать!</h2>
      <form
        className="register__form form"
        name="register-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="register-input-name" className="register__input-label">
          Имя
        </label>
        <input
          value={values.name || ""}
          onChange={handleChange}
          className={`input register__input ${
            !inputsValidity.name ? "register__input_invalid" : ""
          }`}
          id="register-input-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          disabled={isLoading}
          required
        />
        <span className="register__error">{errors.name}</span>
        <label htmlFor="register-input-email" className="register__input-label">
          E-mail
        </label>
        <input
          value={values.email || ""}
          onChange={handleChange}
          className={`input register__input ${
            !inputsValidity.email ? "register__input_invalid" : ""
          }`}
          id="register-input-email"
          name="email"
          type="email"
          disabled={isLoading}
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
          className={`input register__input ${
            !inputsValidity.password ? "register__input_invalid" : ""
          }`}
          id="register-input-password"
          name="password"
          type="password"
          disabled={isLoading}
          required
        />
        <span className="register__error">{errors.password}</span>
        <button
          type="submit"
          className="register__submit-btn"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="register__text">
        <span className="register__server-error">{serverErrorText}</span>
        <span className="register__signin-text">Уже зарегистрированы?</span>
        <Link to="/signin" className="register__signin-link">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default Register;
