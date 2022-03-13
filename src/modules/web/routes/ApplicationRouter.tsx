import React from 'react';

import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import {
  CreateInstituition,
  Instituition,
  InstituitionsMap,
  Landing,
  PageSucess,
  NotFoundPage,
} from '../pages';

export const ApplicationRouter: React.FC<RouteProps> = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/app" component={InstituitionsMap} />
    <Route path="/institutions/create" component={CreateInstituition} />
    <Route path="/institutions/create-sucess" component={PageSucess} />
    <Route path="/institutions/:id" component={Instituition} />
    <Route key="page-404">
      <Route path="*" component={NotFoundPage} />
      <Redirect from="*" to="/404" />
    </Route>
  </Switch>
);
