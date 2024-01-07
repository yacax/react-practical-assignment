import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const state = store.getState();
  const userData = state.user.currentUser;
  if (userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }
});

export default store;
