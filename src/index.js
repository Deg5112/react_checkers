import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'react-redux';

function rootReducer(state = [], action) {
	switch(action.type) {
		case 'action1':
			return Object.assign({}, state, {})
	}
}

let store = createStore(rootReducer());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
