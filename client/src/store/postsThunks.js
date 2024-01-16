import { createAsyncThunk } from '@reduxjs/toolkit';
import mainApi from '../utils/api';

export const fetchPostsByPage = createAsyncThunk(
  'posts/fetchPostsByPage',
  async ({ page, getLastPage = false, getCurrentPage = false }, { rejectWithValue }) => {
    try {
      if (getLastPage || getCurrentPage) {
        const totalPagesResponse = await mainApi.getPostsByPage();
        const { totalPages } = totalPagesResponse;

        if (getLastPage) {
          return await mainApi.getPostsByPage(totalPages);
        }

        if (getCurrentPage) {
          const validPage = totalPages < page ? totalPages : page;
          return await mainApi.getPostsByPage(validPage);
        }
      }
      const response = await mainApi.getPostsByPage(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPostUpdate = createAsyncThunk(
  'posts/fetchPostUpdate',
  async ({ id, post }) => {
    const response = await mainApi.updatePost(id, post);
    return response.result;
  },
);

export const fetchCommentUpdate = createAsyncThunk(
  'posts/fetchCommentUpdate',
  async ({ id, comment }) => {
    const response = await mainApi.updateComment(id, comment);
    return response.result;
  },
);
