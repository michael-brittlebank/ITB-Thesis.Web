import React, { Component } from 'react';

class FormService extends Component {

    static errorMessages = {
        email: 'Invalid Email',
        password: 'Invalid Password.  Must be at least 6 characters'
    };

    static getInputErrorMessage = function(showMessage, messageText){
        return (
            <p className="input-error-message">
                {showMessage?messageText:String.fromCharCode(160)}
            </p>
        );
    };

    static getFormErrorMessage = function(showMessage, messageText){
        return (
            <p className="form-error-message">
                {showMessage?messageText:String.fromCharCode(160)}
            </p>
        );
    };

    static getFormSuccessMessage = function(showMessage, messageText){
        return (
            <p className="form-success-message">
                {showMessage?messageText:String.fromCharCode(160)}
            </p>
        );
    };


}

export default FormService;