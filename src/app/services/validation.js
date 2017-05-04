import { Component } from 'react';
import helperService from './helper';

class ValidationService extends Component {
    static isValidEmail(email){
        return email && email.length > 0 && helperService.isUsableEmail(email);
    }

    static isValidPassword(password){
        return password && password.length > 0;
    }
}

export default ValidationService;