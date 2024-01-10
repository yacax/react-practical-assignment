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

    addComment: (state, action) => {
      const comment = action.payload;
      const post = state.posts
        .find((p) => p.id === comment.postId);
      if (post) {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments = [...post.comments, comment];
      }
    },
    changeCommentById: (state, action) => {
      const { postId, commentId, updates } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post && post.comments) {
        post.comments = post.comments
          .map((comment) => (comment.id === commentId ? { ...comment, ...updates } : comment));
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

});

export const {
  addPost, addPosts, setLoading, deletePostById, changePostById, addComment, changeCommentById,
} = postsSlice.actions;
export default postsSlice.reducer;
