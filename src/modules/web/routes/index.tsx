/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthProvider, useAuth } from '../hooks/useAuth';
import {
  CreateInstituition,
  Instituition,
  InstituitionsMap,
  Landing,
  ChallengeAuthentication,
  PageSucess,
  NotFoundPage,
} from '../pages';

const PrivateRoute = ({
  children,
  ...rest
}: {
  children: JSX.Element | React.FC;
  path: string;
  exact?: boolean;
}) => {
  const { isSignedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export const WebRouter: React.FC = () => (
  <AuthProvider>
    <Switch>
      <Route path="/" exact component={ChallengeAuthentication} />

      <PrivateRoute path="/inicio" exact>
        <Landing />
      </PrivateRoute>

      <PrivateRoute path="/app">
        <InstituitionsMap />
      </PrivateRoute>

      <PrivateRoute path="/institutions/create">
        <CreateInstituition />
      </PrivateRoute>

      <PrivateRoute path="/institutions/create-sucess">
        <PageSucess />
      </PrivateRoute>

      <PrivateRoute path="/institutions/:id">
        <Instituition />
      </PrivateRoute>
      <NotFoundPage />
    </Switch>
  </AuthProvider>
);
