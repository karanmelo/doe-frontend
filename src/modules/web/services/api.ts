import axios, { AxiosRequestConfig } from 'axios';

import { appConfig } from '../configs';
import { useAuth } from '../hooks';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const { getToken } = useAuth();
  const accessToken = getToken();
  if (accessToken) {
    const newConfig = Object.assign(config);
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  }

  return config;
});

export { api };
