import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useHistory } from 'react-router-dom';

import { error as toastError } from '../components';
import { appConfig } from '../configs';
import { useAuth, useIsMounted } from '../hooks';
import { api, IAuthResponse } from '../services';

type AuthData = {
  accessToken: string;
} | null;

type AuthContextData = {
  loading: boolean;
  authData: AuthData | undefined;
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthData>(() => {
    const auth = localStorage.getItem('authData');

    if (!auth) return null;

    const parsedAuth = JSON.parse(auth) as AuthData;

    if (!parsedAuth) return null;

    api.defaults.headers.common.Authorization = `Bearer ${parsedAuth.accessToken}`;

    return parsedAuth;
  });

  const history = useHistory();

  const { signInProvider, signOutProvider } = useAuth();
  const isMounted = useIsMounted();

  const signIn = useCallback(
    async (token: string) => {
      setLoading(true);
      try {
        const response: IAuthResponse = await signInProvider({
          clientId: appConfig.apiClientId || '',
          clientToken: token,
        });
        const { accessToken } = response;
        if (accessToken) {
          if (isMounted.current) {
            setAuthData({ accessToken });
            history.push('/');
          }
        } else {
          toastError('Ops! Houve um erro ao tentar fazer a autenticcação');
        }
      } catch (error) {
        toastError('Ops! Houve um erro ao tentar fazer a autenticcação');
      } finally {
        setLoading(false);
      }
    },
    [history, isMounted, signInProvider]
  );

  const signOut = useCallback(() => {
    signOutProvider();

    if (isMounted.current) setAuthData(null);
  }, [signOutProvider, isMounted]);

  const value = useMemo(
    () => ({
      authData,
      loading,
      signIn,
      signOut,
    }),
    [authData, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (typeof context === 'undefined') {
    throw new Error('AuthContext must be used within an useAuthContext');
  }

  return context;
}
