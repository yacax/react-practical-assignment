import { createAsyncThunk } from '@reduxjs/toolkit';
import mainApi from '../utils/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await mainApi.getPostsByPage();
    return response.result;
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
