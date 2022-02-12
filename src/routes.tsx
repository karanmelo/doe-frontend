import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  Landing,
  InstituitionsMap,
  Instituition,
  CreateInstituition,
} from './pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={InstituitionsMap} />

        <Route path="/orphanages/create" component={CreateInstituition} />
        <Route path="/orphanages/:id" component={Instituition} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
