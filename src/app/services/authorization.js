import { Component } from 'react';

class AuthorizationService extends Component {
    static isUserLoggedIn(state) {
       return state.userState.hasOwnProperty('sessionToken') && !!state.userState.sessionToken && state.userState.sessionToken.length > 0;
    }
}

export default AuthorizationService;