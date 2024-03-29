import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// applyMiddleware is required to be imported 
//  only when we use middleware

// applyMiddleware: redux "action" will go through middleware
//  before "an anction object" reaches out to "reducer" enclosed in redux store. 
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