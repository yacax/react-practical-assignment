import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,

});

export default rootReducer;
