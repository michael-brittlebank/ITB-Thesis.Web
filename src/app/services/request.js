import { Component } from 'react';

class RequestService extends Component {
    static getSessionHeaders(store){
        let currentState = store.getState(),
            sessionToken = currentState.userState.sessionToken;
        return {
            'Authorization': 'Bearer ' + sessionToken
        };
    }

    static getApiUrl(){
        return process.env.REACT_APP_API_URL;
    }
}

export default RequestService;