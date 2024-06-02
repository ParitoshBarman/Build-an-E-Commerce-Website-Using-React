import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/product/:id"
      element={
        <ProtectedRoute>
          <ProductDetailsPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
