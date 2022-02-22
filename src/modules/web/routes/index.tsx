import React from 'react';

import { Switch, Route } from 'react-router-dom';

import {
  CreateInstituition,
  Instituition,
  InstituitionsMap,
  Landing,
} from '../pages';

export const WebRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/app" component={InstituitionsMap} />

    <Route path="/institutions/create" component={CreateInstituition} />
    <Route path="/institutions/:id" component={Instituition} />
  </Switch>
);
