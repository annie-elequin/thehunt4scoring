// import React from 'react';
// import ReactDOM from 'react-dom';
// import Home from '../pages/Home.js';
// import { render } from 'react-dom';

// // render(<h1>Hello from React</h1>, document.getElementById('application'));
       
// const mountNode = document.querySelector('#application');
// ReactDOM.render(<h1>hallo</h1>, mountNode);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Routes from './routes.js';
// import Home from '../pages/Home.js';

import '../views/styles.css';

const reducers = {
	form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const mountNode = document.querySelector('#application');
ReactDOM.render(<Provider store={store}><Routes/></Provider>, mountNode);

