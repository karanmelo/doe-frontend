export const appConfig = {
  useMock: process.env.REACT_APP_USE_MOCK || 'false',
  apiBaseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3003',
};
