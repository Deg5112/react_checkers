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
	coordinateMapToColumn: {
		squareIndex: {
			1: 'A',
			2: 'B',
			3: 'C',
			4: 'D',
			5: 'E',
			6: 'F',
			7: 'G',
			8: 'H',
		}
	},
	playerTurn: 'Player1',
	checkerBoard: {
		checkerMap: {
			player1: [
				'A1', 'C1', 'E1', 'G1', 'B2', 'D2', 'F2', 'H2', 'A3', 'C3', 'E3', 'G3'
			],
			player2: [
				'B6', 'D6', 'F6', 'H6', 'A7', 'C7', 'E7', 'G7', 'B8', 'D8', 'F8', 'H8'
			],
		},
		checkerSelectedToMove: null,
		players: players,
		checkers: [],
	}
};

function rootReducer(state = {}, action) {
	switch(action.type) {
		case 'checkerBoard':
			return {...state, checkerBoard: action.value};
		case 'checkerSelectedToMove':
			return {...state, checkerSelectedToMove: action.value};
		case 'checkers':
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkers: action.value
				}
			}
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
