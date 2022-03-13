import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebRouter } from './modules/web/routes';

export const Router: React.FC = () => (
  <BrowserRouter>
    <WebRouter />
  </BrowserRouter>
);
