import { freeze } from 'modules/web/utils';

import { SignIn, IAuthRequest } from '.';

export const signIn: SignIn = async (request: IAuthRequest) => {
  freeze();

  if (!request.clientToken) return { access_token: undefined };
  return {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };
};
