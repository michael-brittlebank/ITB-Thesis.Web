import { Component } from 'react';
import store from '../../store';

class AuthorizationService extends Component {
    static isUserLoggedIn(nextState, replaceState) {
        let currentState = store.getState();
        if (!currentState.userState.hasOwnProperty('user') || !currentState.userState.user.hasOwnProperty('email')) {
            replaceState({ nextPathname: nextState.location.pathname }, '/')
        }
    }
}

export default AuthorizationService;