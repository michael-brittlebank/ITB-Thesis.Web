import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

//todo, store state to local storage?

import reducers from './app/ducks/index'

const middleware = applyMiddleware(thunk, createLogger());

const store = createStore(
    reducers,
    middleware
);

export default store;