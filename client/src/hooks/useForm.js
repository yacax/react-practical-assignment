import { useState, useEffect } from 'react';

const useForm = (
  initialState,
) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;

    setForm((prevForm) => ({
      ...prevForm,
      [input.name]: input.value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [input.name]: input.validationMessage,
    }));
  };

  useEffect(() => {
    setIsFormValid(Object.values(errors).every((error) => error === ''));
  }, [form, errors]);

  return {
    form, handleChange, errors, isFormValid,
  };
};

export default useForm;
