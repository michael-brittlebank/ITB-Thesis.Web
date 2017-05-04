import { Component } from 'react';
import store from '../../store';
import authorizationService from './authorization';

class MiddlewareService extends Component {
    static isUserLoggedInMiddleware(nextState, replaceState) {
        let currentState = store.getState();
        if (!authorizationService.isUserLoggedIn(currentState.userState)) {
            replaceState({ nextPathname: nextState.location.pathname }, '/')
        }
    }
}

export default MiddlewareService;