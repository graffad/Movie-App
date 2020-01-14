import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Films } from './components/Films';
import { Info } from './components/Info';

export function App() {
  return (

    <Router>
    <Route path="/" component={Header}/>
    <Route path="/films" component={Films}/>
      {/* <Route  path="/films/:id"><Info/></Route> */}
      <Route path="/films/:id" component={Info}/>
    </Router>
  );
}
