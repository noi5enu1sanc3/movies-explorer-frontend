import { useRef, useContext, useEffect, useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Profile = ({
  onLogout,
  onUpdateProfile,
  isFormDisabled,
  setIsFormDisabled,
  serverErrorText,
  setServerError,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    inputsValidity,
    setIsValid,
    resetForm,
  } = useFormAndValidation();

  const ref = useRef(null);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const enableEdit = () => {
    setServerError(prev => {
      return {
      ...prev,
      profile: "",
    }});
    setIsValid(false);
    setValues(currentUser);
    setIsFormDisabled(false);
    setTimeout(() => ref.current.focus(), 50);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateProfile(values);
  };

  const handleCancelEdit = () => {
    resetForm();
    setValues(currentUser);
    setIsFormDisabled(true);
  };

  useEffect(() => {
    setIsSubmitDisabled(
      !isValid ||
        (values.name === currentUser.name &&
          values.email === currentUser.email) ||
        isLoading
    );
  }, [values, currentUser, isLoading, isValid]);

  useEffect(() => {
    if (currentUser) {
      setValues({ name: currentUser.name, email: currentUser.email });
    }
    return () => setIsFormDisabled(true);
  }, [currentUser, setIsFormDisabled, setValues]);

  return (
    <main className="profile">
      <p className="profile__greeting">{`Привет, ${
        currentUser ? currentUser.name : ""
      }!`}</p>
      <form
        className={`profile__form form ${
          !isFormDisabled ? "profile__form_active" : ""
        }`}
        name="edit-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset
          className="profile__fieldset"
          disabled={isFormDisabled || isLoading}
        >
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
              className={`input profile__input ${
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
              className={`input profile__input ${
                inputsValidity.email === false ? "profile__input_invalid" : ""
              }`}
            />
          </label>
          <span className="profile__error">{errors.email}</span>
        </fieldset>
        {!isFormDisabled && (
          <div className="profile__buttons-wrapper">
            <span className="profile__server-error">{serverErrorText}</span>
            <button
              type="button"
              className="profile__cancel-btn"
              onClick={handleCancelEdit}
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="profile__submit-btn"
              disabled={isSubmitDisabled}
            >
              {isLoading ? "Сохраняем..." : "Сохранить"}
            </button>
          </div>
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
