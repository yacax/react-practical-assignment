import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },

});

export const { addPost, addPosts } = postsSlice.actions;
export default postsSlice.reducer;
