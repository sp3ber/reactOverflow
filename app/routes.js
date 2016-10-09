import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import App from './containers/App';
import MainPage from './containers/pages/MainPage';
import QuestionsTableContainer from './containers/QuestionsTableContainer';


export default (
  <Route component={App}>
    <Route component={MainPage} path="/">
      <Route path='search' component={QuestionsTableContainer} />
    </Route>
  </Route>
);