import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import NavigationBar from '../containers/NavigationBar';

const Router = () => (
  
  <BrowserRouter>
    <>
      <NavigationBar />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
    </>
  </BrowserRouter>
);

export default Router;
