import { useState, useEffect } from 'react';
import validateUsername from '../utils/validateUsername';
import { USERNAME_ERROR_MESSAGE } from '../utils/infoMessagesTexts';

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
    let errorMessage = '';

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

    if (name === 'username' && !validateUsername(value)) {
      errorMessage = USERNAME_ERROR_MESSAGE;
    } else {
      errorMessage = '';
    }

    const browserErrorMessage = event.target.validationMessage;

    errorMessage = browserErrorMessage || errorMessage;
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

  const addValue = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsFormValid(!hasErrors() && checkInitial());
  }, [form, errors]);

  return {
    form, handleChange, errors, isFormValid, resetForm, resetValue, setFormFields, addValue,
  };
};

export default useForm;
