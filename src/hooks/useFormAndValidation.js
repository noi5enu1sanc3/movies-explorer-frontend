import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [checkboxValues, setCheckBoxValues] = useState({});
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

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setCheckBoxValues({ ...checkboxValues, [name]: checked });
  };

  const validateSubmit = (e, errorText) => {
    setErrors({ ...errors, submit: errorText });
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
    checkboxValues,
    handleChange,
    validateSubmit,
    errors,
    isValid,
    resetForm,
    setValues,
    setCheckBoxValues,
    setIsValid,
    inputsValidity,
    resetErrors,
    handleCheckBox,
  };
}
