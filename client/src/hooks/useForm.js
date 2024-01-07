import { useState, useEffect } from 'react';

const useForm = (
  initialState,
) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const hasErrors = () => Object.values(errors).some((value) => value !== '');
  const checkInitial = () => !Object.keys(form).every((key) => form[key] === initialState[key]);

  const handleChange = (evt) => {
    const input = evt.target;

    setForm((prevForm) => ({
      ...prevForm,
      [input.name]: input.value,
    }));

    const errorMessage = input.validationMessage;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [input.name]: errorMessage,
    }));
  };

  useEffect(() => {
    setIsFormValid(!hasErrors() && checkInitial());
  }, [form, errors]);

  return {
    form, handleChange, errors, isFormValid,
  };
};

export default useForm;
