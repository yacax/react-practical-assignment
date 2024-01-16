import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postsFinded: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addPostsFinded: (state, action) => {
      state.postsFinded = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addPostsFinded, setLoading, setError } = searchSlice.actions;
export default searchSlice.reducer;
