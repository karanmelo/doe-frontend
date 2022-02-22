import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebRouter } from 'modules/web/routes';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <WebRouter />
    </BrowserRouter>
  );
};

export default Routes;
