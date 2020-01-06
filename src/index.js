import React from 'react';
import { Provider } from 'react-redux';
// import { Provider, intlReducer } from 'react-intl-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App/AppContainer';
import appReducers from './reducers';

require("babel-core/register");
require("babel-polyfill");
// CSS
import './../public/dist/css/bootstrap.min.css';
import './../public/dist/css/AdminLTE.css';
import "antd/dist/antd.css";

// JS
import 'jquery';
import './../public/dist/js/bootstrap.min.js';
import 'raphael/raphael.min.js';
import 'jquery-knob/dist/jquery.knob.min.js';
import 'jquery-slimscroll/jquery.slimscroll.min.js';
import 'jquery-sparkline/jquery.sparkline.min.js';
import 'fastclick/lib/fastclick.js';
import './../public/dist/js/adminlte.min.js';

const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('body')
);