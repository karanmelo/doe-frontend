import axios from 'axios';
import { appConfig } from 'configs';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

export default api;
