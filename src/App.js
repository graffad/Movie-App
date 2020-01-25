import React from 'react';
import {
  Router,
  Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Films from './components/Films';
import Info from './components/Info';
import NotFound from './components/NotFound';
import History from './components/History';
import history from './state-managment/history';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Header}/>
        <Route path="/films" exact component={Films}/>
        <Route path="/films/:id" exact component={Info}/>
        <Route path="/not-found" component={NotFound}/>
        <Route path="/history" exact component={History}/>
        <Redirect to={'/not-found'}/>
      </Switch>
    </Router>
  );
}
