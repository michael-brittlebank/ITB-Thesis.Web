import { Component } from 'react';

class AuthorizationService extends Component {
    static isUserLoggedIn(state) {
        return state.hasOwnProperty('sessionToken') && state.sessionToken && state.sessionToken.length < 0;
    }
}

export default AuthorizationService;