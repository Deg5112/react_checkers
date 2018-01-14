import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Player from './components/Player.js';

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
		},
		columnIndex: {
			'A': 1,
			'B': 2,
			'C': 3,
			'D': 4,
			'E': 5,
			'F': 6,
			'G': 7,
			'H': 8
		}
	},
	checkerBoard: {
		possibleMoveCoordinates: [],
		checkerSelectedToMove: null,
		checkerBoardRef: null,
		checkerRefs: [],
		Player1:
			new Player(
				'Player1',
				[
					'A1', 'C1', 'E1', 'G1',
					'B2', 'D2', 'F2', 'H2',
					'A3', 'C3', 'E3', 'G3'
				],
				true,
				[]
			),
		Player2:
			new Player(
				'Player2',
				[
					'B6', 'D6', 'F6', 'H6',
					'A7', 'C7', 'E7', 'G7',
					'B8', 'D8', 'F8', 'H8'
				],
				false,
				[]
			),
	}
};

function rootReducer(state = {}, action) {
	switch(action.type) {
		case 'checkerBoard': //this generally doesn't work find out why..
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					...action.value
				}
			};
			
		case 'checkerSelectedToMove':
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkerSelectedToMove: action.value
				}
			};
		
		case 'checkerSelectedToMoveCoordinate':
			console.log('updates checker selected coordinate', {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkerSelectedToMove: {
						...state.checkerBoard.checkerSelectedToMove,
						props: {
							...state.checkerBoard.checkerSelectedToMove.props,
							coordinate: action.value
						}
					}
				}
			});
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkerSelectedToMove: {
						...state.checkerBoard.checkerSelectedToMove,
						props: {
							...state.checkerBoard.checkerSelectedToMove.props,
							coordinate: action.value
						}
					}
				}
			};
			
		case 'possibleMoveCoordinates':
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					possibleMoveCoordinates: action.value
				}
			};
		case 'checkerRef':
			let coordinate = action.value.props.coordinate;
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkerRefs: {
						...state.checkerBoard.checkerRefs,
						[coordinate]: action.value,
					}
				}
			};
		case 'checkerBoardRef':
			return {
				...state,
				checkerBoard: {
					...state.checkerBoard,
					checkerBoardRef: action.value
				}
			};
			
		default:
			return {...state};
	}
}

let store = createStore(rootReducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
