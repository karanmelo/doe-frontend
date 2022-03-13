import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { ChallengeAuthentication } from '../pages';
import { HttpRequestErrorInterceptor } from '../services';
import { AuthContextProvider } from '../stores';
import { ApplicationRouter } from './ApplicationRouter';
import { PrivateRouter } from './utils';

export const WebRouter: React.FC = () => (
  <AuthContextProvider>
    <Switch>
      <Route path="/login" exact component={ChallengeAuthentication} />
      <PrivateRouter>
        <Route>
          <ApplicationRouter />
        </Route>
      </PrivateRouter>
    </Switch>

    <HttpRequestErrorInterceptor />
  </AuthContextProvider>
);
