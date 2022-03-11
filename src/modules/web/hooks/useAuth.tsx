/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext, useContext, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import { error as toastError } from '../components';
import { appConfig } from '../configs';
import { IAuthResponse, signIn } from '../services/auth';

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

  const authenticationProvider = async (accessToken: string) => {
    setLoading(true);
    try {
      const response: IAuthResponse = await signIn({
        clientId: appConfig.apiClientId || '',
        clientToken: accessToken,
      });
      const token = response.accessToken;
      if (token) {
        setAuth(token);
        window.localStorage.setItem('@doe/auth', token);
        history.push('/');
      } else {
        toastError('Ops! Houve um erro ao tentar fazer a autenticcação');
      }
    } catch (error) {
      toastError('Ops! Houve um erro ao tentar fazer a autenticcação');
    } finally {
      setLoading(false);
    }
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
