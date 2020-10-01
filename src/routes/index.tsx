import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Appointments from '../pages/Appointments';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import PatientDetail from '../pages/PatientDetail';
import AddPatient from '../pages/AddPatient';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/appointments" component={Appointments} />
    <Route path="/patients" component={Patients} />
    <Route path="/patient-detail/:id" component={PatientDetail} />
    <Route path="/add-patient" component={AddPatient} />
  </Switch>
);

export default Routes;
