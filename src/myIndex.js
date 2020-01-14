import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './App';
import rootReducer from './state-managment/reducers/index';

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root'),
);
