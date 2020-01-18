import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';
import { Header } from './components/Header';
import { Films } from './components/Films';
import { Info } from './components/Info';
import { NotFound } from './components/NotFound';

export function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" exact component={Header}/>
        <Route path="/films" exact component={Films}/>
        {/* <Route  path="/films/:id"><Info/></Route> */}
        <Route path="/films/:id" exact component={Info}/>
        <Route path="/not-found" component={NotFound}/>
        <Redirect to={'/not-found'}/>
      </Switch>
    </Router>
  );
}
