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
      state.posts = [...state.posts, action.payload];
    },
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    deletePostById: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    changePostById: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, ...action.payload.updates };
        }
        return post;
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

});

export const {
  addPost, addPosts, setLoading, deletePostById, changePostById,
} = postsSlice.actions;
export default postsSlice.reducer;
