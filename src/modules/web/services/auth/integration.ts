import { SignIn, IAuthRequest, IAuthResponse } from '.';
import api from '../api';

export const signIn: SignIn = async (
  request: IAuthRequest
): Promise<IAuthResponse> => {
  const body = { clientId: request.clientId, clientToken: request.clientToken };
  const response = await api.post<IAuthResponse>(
    'challenge/authenticate',
    body
  );
  return response.data;
};
