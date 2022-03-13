/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { api } from '.';
import { useAuth } from '../hooks';

export const HttpRequestErrorInterceptor = () => {
  const interceptorId = useRef<number | undefined>(undefined);

  const history = useHistory();
  const { signOutProvider } = useAuth();

  interceptorId.current = api.interceptors.response.use(undefined, (error) => {
    signOutProvider();
    switch (error.response.status) {
      case 401:
        history.push('/login');
        break;
      case 404:
        history.push('/404');
        break;
      default:
    }
  });

  useEffect(() => {
    return () => {
      if (interceptorId.current)
        api.interceptors.response.eject(interceptorId.current);
    };
  }, [history]);

  return null;
};
