import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import reducer from './Redux/Reducer';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const store = createStore(
  reducer,
  {
    players: [],
    games: [],
    loading: false,
    error: false,
  },
  compose(
    applyMiddleware(thunk),
    /* eslint-disable */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ||
    compose
    /* eslint-enable */
  ),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
