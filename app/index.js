import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Router} from 'react-router';
import routes from './routes';
const rootElement = document.querySelector('#app');

render(
  <Router history={browserHistory}>
    {routes}
  </Router>
  , rootElement);