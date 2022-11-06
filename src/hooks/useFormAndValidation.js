import { useState, useCallback } from "react";
import { EMAIL_REGEX, NAME_REGEX } from "../utils/constants";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: setCustomErrors(e) });
    setInputsValidity({
      ...inputsValidity,
      [name]: validateInputs(e.target),
    });
    setIsValid(validateForm(e));
  };

  const validateForm = (e) => {
    const inputs = Array.from(
      e.target.closest(".form").querySelectorAll(".input")
    );
    return inputs.every(
      (i) => validateInputs(i) && e.target.closest(".form").checkValidity()
    );
  };

  const validateInputs = (input) => {
    const isEmail = () => EMAIL_REGEX.test(input.value);
    const isName = () => NAME_REGEX.test(input.value);

    if (input.name === "email") return isEmail() && input.checkValidity();
    if (input.name === "name") return isName() && input.checkValidity();
    return input.checkValidity();
  };

  const setCustomErrors = (e) => {
    if (e.target.name === "name" && !NAME_REGEX.test(e.target.value)) {
      return "Имя может содержать только латиницу, кириллицу, пробел или дефис";
    }
    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      return "Некорректный email";
    } else return e.target.validationMessage;
  };

  const validateSubmit = (e, errorText) => {
    setErrors({ ...errors, submit: errorText });
    setIsValid(validateForm(e));
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newInputsValidity = {}
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setInputsValidity(newInputsValidity);
    },
    [setValues, setErrors, setIsValid, setInputsValidity]
  );

  const resetErrors = useCallback(
    (newErrors = {}) => {
      setErrors(newErrors);
    },
    [setErrors]
  );

  return {
    values,
    handleChange,
    validateSubmit,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    inputsValidity,
    resetErrors,
  };
}
