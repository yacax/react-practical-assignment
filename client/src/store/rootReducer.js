import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import searchReducer from './searchSlice';
import userReducer from './userSlice';
import infoReducer from './infoSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  user: userReducer,
  info: infoReducer,
});

export default rootReducer;
