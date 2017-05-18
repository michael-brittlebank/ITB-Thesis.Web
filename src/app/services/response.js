import { Component } from 'react';

class ResponseService extends Component {
    static responseHasError(response){
        if (!!response && response.hasOwnProperty('status') && !!response.status){
            switch (response.status) {
                case 500:
                case 401:
                case 400:
                    return true;
                default:
                    return false;
            }
        } else {
            //neither true nor false
            return null;
        }
    }
}

export default ResponseService;