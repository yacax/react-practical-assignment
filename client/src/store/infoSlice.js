import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  severity: 'info',
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },

    clearInfo: (state) => {
      state.message = initialState.message;
      state.severity = initialState.severity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('search/fetchSearch/rejected', (state, action) => {
        state.message = action.payload.message;
        state.severity = 'error';
      });
  },
});

export const { addInfo, clearInfo } = infoSlice.actions;
export default infoSlice.reducer;
