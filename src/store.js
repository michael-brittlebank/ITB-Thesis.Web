import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import reducers from './app/ducks/index'
import helperService from './app/services/helper';
import { actions as userActions } from './app/ducks/user';

const middleware = applyMiddleware(thunk, createLogger());
let store;

if (helperService.isDevelopment()){
    store = compose(
        middleware,
        autoRehydrate()
    )(createStore)(reducers);

    persistStore(store, {}, () => {
        let currentState = store.getState(),
            sessionToken = currentState.userState.sessionToken;
        if (!!sessionToken){
            userActions.getProfile()
                .catch(() => {
                    //purge store upon session cookie expiry
                    persistStore(store).purge();
                    return store.dispatch(userActions.logout());
                });
        }
    });
} else {
    store = createStore(
        reducers,
        middleware
    );
}

export default store;