import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Player from './components/Player.js';
//this should be imported, use combineReducers
let players = [(new Player('player1')), (new Player('player2'))];

let initialState = {
	checkerBoard: {
		players: players,
		rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
		playerTurn: null,
	}
};

function rootReducer(state = {}, action) {
	switch(action.type) {
		case 'checkerBoard':
			return Object.assign({}, state, {checkerBoard: action.value})
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
