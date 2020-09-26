import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Appointments from '../pages/Appointments';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/appointments" component={Appointments} />
    <Route path="/patients" component={Patients} />
  </Switch>
);

export default Routes;
