import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import fetchSearch from '../../store/searchThunks';
import { DEBOUNCE_DELAY } from '../../utils/config';
import { resetSearch } from '../../store/searchSlice';

export default function SearchSection() {
  const dispatch = useDispatch();
  const [debounceTimer, setDebounceTimer] = useState(null);
  const {
    form, handleChange, resetForm, errors,
  } = useForm({ search: '' });

  const handleSearch = async () => {
    dispatch(fetchSearch(form.search));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      if (form.search) {
        handleSearch();
      } else {
        dispatch(resetSearch());
      }
    }, DEBOUNCE_DELAY);
    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [form.search, dispatch]);

  return (
    <Box
      p={0}
      px={1}
      sx={{
        mt: 3.5,
        mb: 2,

      }}
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          m: 'auto',
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={errors.search ? errors.search : 'Search Posts'}
          inputProps={{
            'aria-label': 'search posts',
            minLength: 1,
          }}
          name="search"
          id="search"
          value={form.search}
          onChange={handleChange}
          required
        />
        <IconButton
          type="button"
          fontSize="small"
          sx={{ p: '10px' }}
          aria-label="clear"
          onClick={() => {
            resetForm();
            dispatch(resetSearch());
          }}
        >
          <ClearIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
