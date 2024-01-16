import { createAsyncThunk } from '@reduxjs/toolkit';
import mainApi from '../utils/api';

const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await mainApi.searchPostsByKeyword(keyword);
      return response.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default fetchSearch;
