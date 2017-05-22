import { Component } from 'react';
import moment from 'moment';

class HelperService extends Component {
    static isDevelopment(){
        return process.env.NODE_ENV === 'development';
    }

    static isUsableEmail(email) {
        /*jshint ignore:start*/
        /*eslint-disable*/
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        /*eslint-enable*/
        /*jshint ignore:end*/
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static formatTimestamp(timestamp){
        return moment(timestamp).calendar();
    }
}

export default HelperService;