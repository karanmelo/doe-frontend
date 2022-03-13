import {
  IAuthRequest,
  IAuthResponse,
  signIn as signInService,
} from '../services';
import { AuthData } from '../types';

const ACCESS_TOKEN_KEY = '@appdoe_access_token';

export const useAuth = () => {
  const isAuthenticated = () => localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
  const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

  const signInProvider = async (params: IAuthRequest): Promise<AuthData> => {
    const response: IAuthResponse = await signInService(params);

    const { accessToken } = response;

    localStorage.setItem('authData', JSON.stringify(response));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    const authData: AuthData = {
      accessToken,
    };

    return authData;
  };

  const signOutProvider = (): void => {
    localStorage.removeItem('authData');
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  return {
    isAuthenticated,
    getToken,
    signInProvider,
    signOutProvider,
  };
};
