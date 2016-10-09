import React from 'react';
import { Route } from 'react-router';
import { index, search } from './constants/routes';
import App from './containers/App';
import MainPage from './containers/pages/MainPage';
import SearchPage from './containers/pages/SearchPage';


export default (
  <Route component={App}>
    <Route component={MainPage} path={index}>
      <Route path={search} component={SearchPage} />
    </Route>
  </Route>
);
