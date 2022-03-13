import { freeze } from 'modules/web/utils';

import { SignIn, IAuthRequest, IAuthResponse } from '.';

export const signIn: SignIn = async (
  request: IAuthRequest
): Promise<IAuthResponse> => {
  freeze();

  if (!request.clientToken) {
    throw new Error('Token inválido');
  }

  return {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };
};
