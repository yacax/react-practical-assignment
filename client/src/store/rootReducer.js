import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import userReducer from './userSlice';
import infoReducer from './infoSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  info: infoReducer,

});

export default rootReducer;
