import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './utils/ProtectedRoute';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import { addPosts } from './store/postsSlice';
import { TEST_POSTS } from './utils/constants';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPosts(TEST_POSTS));
  }, []);

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute isAuthenticated={!!currentUser}>
              <MainPage />
            </ProtectedRoute>
        )}
        />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
