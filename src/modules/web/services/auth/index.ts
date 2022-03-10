import { appConfig } from '../../configs';
import * as integration from './integration';
import * as mock from './mock';

const selectedModule = appConfig.useMock === 'true' ? mock : integration;

export type IAuthResponse = {
  access_token: string | undefined;
};

export type IAuthRequest = {
  clientId: string;
  clientToken: string;
};

export type SignIn = (request: IAuthRequest) => Promise<IAuthResponse>;

export const { signIn } = selectedModule;
