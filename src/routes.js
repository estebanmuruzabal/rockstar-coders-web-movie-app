import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import MovieDetailPage from 'pages/MovieDetailPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movie/:id" component={MovieDetailPage} />
    </Switch>
  );
}
