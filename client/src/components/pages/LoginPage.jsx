import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { setCurrentUser } from '../../store/userSlice';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import useForm from '../../hooks/useForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    form,
    errors,
    isFormValid,
    handleChange,
  } = useForm({
    username: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setCurrentUser(form.username));
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate, form]);

  return (
    <BasicLayout>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          flexGrow: 1,
          gap: 2,
          height: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)',
          },
        }}
      >
        <Typography component="h1" variant="h5">
          Authorization
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: '320px',
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Your name"
            name="username"
            autoComplete="username"
            autoFocus
            value={form.name}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username || ' '}
            FormHelperTextProps={{
              style: { minHeight: '1em' },
            }}
            inputProps={
              {
                maxLength: 25,
              }
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid}
            sx={{
              mt: 3,
              mb: 10,
            }}
          >
            Login
          </Button>

        </Box>
      </Box>
    </BasicLayout>
  );
}
