/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext, useContext, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

type AuthContextProps = {
  loading: boolean;
  isSignedIn: boolean;
  authenticationProvider: (token: string) => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<string | undefined>(() => {
    const authToken = window.localStorage.getItem('@doe/auth');

    if (!authToken) return undefined;

    return authToken;
  });
  const isSignedIn = useMemo(() => !!auth, [auth]);
  const history = useHistory();

  const authenticationProvider = async (token: string) => {
    setLoading(true);

    // Todo realizar resquest
    setAuth(token);

    window.localStorage.setItem('@doe/auth', token);
    setLoading(false);
    history.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ loading, isSignedIn, authenticationProvider }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('You just can access this context inside a provider');
  }

  return context;
};
