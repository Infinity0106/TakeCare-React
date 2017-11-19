import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import AppLayout from 'src/layout/app';
import Login from 'src/layout/login';

/* Demos */
import { Welcome } from 'src/page/welcome';
import { Paciente } from 'src/page/paciente';
import { Doctor } from 'src/page/doctor';
import { Tratamiento } from 'src/page/tratamiento';
import { Cambio } from 'src/page/cambio';
// import { About } from 'src/page/about';
// import { ProgressBars } from 'src/page/progress-bars';
// import { TableDemo } from 'src/page/table-demo';
// import { ButtonDemo } from 'src/page/button-demo';
// import { ModalDemo } from 'src/page/modal-demo';
// import { TabsDemo } from 'src/page/tabs-demo';
// import { InputDemo } from 'src/page/input-demo';
// import { NotificationsDemo } from 'src/page/notifications-demo';

/* End Demos */

import { NotFound } from 'src/page/not-found';

// Redirect is got GH pages and can be deleted for forked projects
const redirect = <Redirect from="/react-webpack-skeleton" to="/" />;

export const AppRouter = (
  <Router history={browserHistory}>
    {redirect}
    {/* <Route path='/login' component={Login} /> */}
    <Route component={AppLayout}>
      <Route path="/" component={Welcome} />
      <Route path="/paciente" component={Paciente} />
      <Route path="/doctor" component={Doctor} />
      <Route path="/tratamiento" component={Tratamiento} />
      <Route path="/cambio" component={Cambio} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
