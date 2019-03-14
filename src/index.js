import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// applyMiddleware: redux "action" will go throw middleware
//  other than that return directly goes to reducer

// applyMiddleware is required to be imported 
//  only when we use middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// define that middleware is "thunk"
// we can use a different middleware library if we want.
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.querySelector('#root')
);