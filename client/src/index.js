import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Routes from './routes.js';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const reducers = {
	form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const mountNode = document.querySelector('#application');
ReactDOM.render(<Provider store={store}><Routes/></Provider>, mountNode);



registerServiceWorker();
