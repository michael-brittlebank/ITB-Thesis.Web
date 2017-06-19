import React, { Component } from 'react';

class FormService extends Component {

    static errorMessages = {
        update: 'Unable to update',
        empty: 'Please enter a value',
        email: 'Invalid Email',
        password: 'Invalid Password.  Must be at least 6 characters',
        repeatPassword: 'Passwords do not match',
        register: 'Registration failed.  Please double-check email and password and ensure email has not already been registered'
    };

    static successMessages = {
        update: 'Updated successfully'
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

    static serializeForm = function(formElement){
        let data = {};
        formElement.querySelectorAll('input, select, textarea').forEach(function(entry){
            if(!!entry.name) {
                data[entry.name] = entry.value;
            }
        });
        return data;
    }

}

export default FormService;