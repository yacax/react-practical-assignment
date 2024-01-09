import { useState, useEffect } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const hasErrors = () => Object.values(errors).some((value) => value !== '');
  const checkInitial = () => !Object.keys(form).every((key) => form[key] === initialState[key]);

  const handleChange = (event) => {
    const {
      name, value, files, type,
    } = event.target;

    if (type === 'file') {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }

    const errorMessage = event.target.validationMessage;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const resetForm = (state) => {
    setForm(state || initialState);
    setErrors({});
  };

  const resetValue = (name) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: initialState[name],
    }));
  };

  const setFormFields = (fields) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...fields,
    }));
  };

  useEffect(() => {
    setIsFormValid(!hasErrors() && checkInitial());
  }, [form, errors]);

  return {
    form, handleChange, errors, isFormValid, resetForm, resetValue, setFormFields,
  };
};

export default useForm;
