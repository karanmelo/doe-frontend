import React from 'react';

import { Redirect } from 'react-router-dom';

import { useAuth } from '../../hooks';

export const PrivateRouter: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
