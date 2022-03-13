import { useEffect, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { api } from '.';
import { useAuthContext } from '../stores';

export const HttpRequestErrorInterceptor = () => {
  const interceptorId = useRef<number | undefined>(undefined);

  const history = useHistory();
  const { signOut } = useAuthContext();

  useEffect(() => {
    interceptorId.current = api.interceptors.response.use(
      undefined,
      (error) => {
        signOut();
        switch (error.response.status) {
          case 404:
            history.push('/404');
            break;
          default:
            history.push('/login');
        }
      }
    );

    return () => {
      if (interceptorId.current)
        api.interceptors.response.eject(interceptorId.current);
    };
  }, [history, signOut]);

  return null;
};
