import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import moviesReducer from './store/reducers/movies';
import tvShowsReducer from './store/reducers/tvShows';
import peopleReducer from './store/reducers/people';
import creditsReducer from './store/reducers/credits';
import typeaheadReducer from './store/reducers/typeahead';

const rootElement = document.getElementById('root');

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  people: peopleReducer,
  credits: creditsReducer,
  typeahead: typeaheadReducer
});

// Makes it possible to use Redux Devtools extension.
// Won't work in production but does not give any negative side-effects
// if left alone.
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
