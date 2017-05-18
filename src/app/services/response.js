import { Component } from 'react';

class ResponseService extends Component {
    static responseHasError(response){
        if (!!response && response.hasOwnProperty('status') && !!response.status){
            switch (response.status) {
                case 401:
                    return true;
                default:
                    return false;
            }
        }
        return false
    }
}

export default ResponseService;