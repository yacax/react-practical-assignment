import React from 'react';
import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  isAuthenticated: false,
};

export default ProtectedRoute;
