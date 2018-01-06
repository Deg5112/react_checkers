import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//this should be imported, use combineReducers
let initialState = {
	checkerBoard: {
		players: [],
	}
};

function rootReducer(state = {}, action) {
	console.log('state', state);
	switch(action.type) {
		case 'checkerBoard':
			return Object.assign({}, state, {checkerBoard: action.checkerBoard})
	}
	return state;
}

let store = createStore(rootReducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
