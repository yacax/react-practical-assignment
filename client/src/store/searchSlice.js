import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postsFinded: [],
  nothingFound: false,
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
    resetSearch: (state) => {
      state.postsFinded = [];
      state.nothingFound = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('search/fetchSearch/pending', (state) => {
        state.loading = true;
      })
      .addCase('search/fetchSearch/fulfilled', (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.nothingFound = true;
          state.postsFinded = [];
        } else {
          state.nothingFound = false;
        }
        state.postsFinded = action.payload;
      })
      .addCase('search/fetchSearch/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

});

export const {
  addPostsFinded, setLoading, setError, resetSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
