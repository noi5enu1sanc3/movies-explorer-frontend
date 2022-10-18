import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setInputsValidity({ ...inputsValidity, [name]: e.target.checkValidity() });
    setIsValid(e.target.closest(".form").checkValidity());
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
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    inputsValidity,
    resetErrors,
  };
}
