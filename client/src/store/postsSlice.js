import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPostsByPage, fetchPostUpdate, fetchCommentUpdate, fetchCommentDelete,
} from './postsThunks';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPage: null,
    totalPages: null,
    loading: false,
    error: null,
  },
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

    deleteCommentById: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post && post.comments) {
        post.comments = post.comments.filter((comment) => comment.id !== commentId);
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.posts = action.payload.result;
      })
      .addCase(fetchPostsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostUpdate.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex((p) => p.id === action.payload.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = { ...state.posts[postIndex], ...action.payload };
        }
      })
      .addCase(fetchCommentUpdate.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.postId);
        if (post && post.comments) {
          const commentIndex = post.comments.findIndex((c) => c.id === action.payload.id);
          if (commentIndex !== -1) {
            post.comments[commentIndex] = { ...post.comments[commentIndex], ...action.payload };
          }
        }
      })
      .addCase(fetchCommentDelete.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.postId);
        if (post && post.comments) {
          post.comments = post.comments.filter((c) => c.id !== action.payload.id);
        }
      });
  },
});

export const {
  addPost,
  addPosts,
  setLoading,
  deletePostById,
  changePostById,
  addComment,
  changeCommentById,
  deleteCommentById,
  toggleLikeDislike,
} = postsSlice.actions;
export default postsSlice.reducer;
