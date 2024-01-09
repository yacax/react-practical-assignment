import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './utils/ProtectedRoute';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

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
