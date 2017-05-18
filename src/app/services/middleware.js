import { Component } from 'react';
import store from '../../store';
import authorizationService from './authorization';
import userService from './user';

class MiddlewareService extends Component {
    static isUserLoggedInCheck(nextState, replaceState) {
        let currentState = store.getState();
        if (!authorizationService.isUserLoggedIn(currentState)) {
            replaceState({ nextPathname: nextState.location.pathname }, '/')
        }
    }

    static isUserLoggedInRedirect(nextState, replaceState) {
        let currentState = store.getState();
        if (authorizationService.isUserLoggedIn(currentState)) {
            replaceState({ nextPathname: nextState.location.pathname }, '/dashboard')
        }
    }

    static isUserAdmin(nextState, replaceState) {
        let currentState = store.getState(),
            user = currentState.userState.currentUser;
        if (!authorizationService.isUserLoggedIn(currentState) || !userService.isUserAdmin(user)) {
            replaceState({ nextPathname: nextState.location.pathname }, '/')
        }
    }
}

export default MiddlewareService;