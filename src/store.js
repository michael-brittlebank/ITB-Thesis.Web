import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import reducers from './app/ducks/index'
import helperService from './app/services/helper';

const middleware = applyMiddleware(thunk, createLogger());
let store;

if (helperService.isDevelopment()){
    //persist storage only for dev environment for now
    store = compose(
        middleware,
        autoRehydrate()
    )(createStore)(reducers);

    persistStore(store);
//todo expire cache https://github.com/rt2zz/redux-persist/issues/65
} else {
    store = createStore(
        reducers,
        middleware
    );
}

export default store;