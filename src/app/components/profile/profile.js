import React, { Component } from 'react';
import classNames from 'classnames';

import formService from '../../services/form';
import validationService from '../../services/validation';
import responseService from '../../services/response';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordError: false,
            submissionError: null,
            firstNameError: false,
            lastNameError: false,
            repeatPasswordError: null
        };
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            submissionError: responseService.responseHasError(nextProps.response)
        });
    }

    handleProfileSubmit = (event) => {
        event.preventDefault();
        let submitPassword = '',
            passwordValue = this.password.value,
            repeatPassword = this.repeatPassword.value,
            firstNameValue = this.firstName.value,
            lastNameValue = this.lastName.value,
            validFirstName = !validationService.isValueEmpty(firstNameValue),
            validLastName = !validationService.isValueEmpty(lastNameValue),
            validPassword = true,
            validRepeatPassword = true;
        if (passwordValue.length > 0 || repeatPassword.length > 0){
            validPassword = validationService.isValidPassword(passwordValue);
            validRepeatPassword = validationService.doPasswordsMatch(passwordValue, repeatPassword);
            submitPassword = passwordValue;
        }
        this.setState({
            firstNameError: !validFirstName,
            lastNameError: !validLastName,
            passwordError: !validPassword,
            repeatPasswordError: !validRepeatPassword,
            submissionError: null
        });
        if (validPassword && validRepeatPassword && validFirstName && validLastName) {
            this.props.handleUpdateSubmit(firstNameValue, lastNameValue, submitPassword);
        }
    };

    renderFormMessages(){
        if (this.state.submissionError === true){
            return formService.getFormErrorMessage(true,formService.errorMessages.update);
        } else if (this.state.submissionError === false){
            //reset form
            this.password.value = '';
            this.repeatPassword.value = '';
            return formService.getFormSuccessMessage(true, formService.successMessages.update);
        } else {
            //default
            return formService.getFormErrorMessage(false,'');
        }
    }

    render() {
        return (
            <main id="container-profile" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            Profile
                        </h1>
                    </div>
                    <div className="col-sm-6">
                        <h3>Personal Details</h3>
                        <form onSubmit={this.handleProfileSubmit} className="standard-form">
                            <p>
                                Email Address: {this.props.user.email}
                            </p>
                            <label className={
                                classNames({
                                    'error': this.state.firstNameError
                                })
                            }>
                                First Name
                                <input type="text"
                                       id="first-name"
                                       defaultValue={this.props.user.firstName}
                                       ref={(input) => this.firstName = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.firstNameError,formService.errorMessages.empty)}
                            <label className={
                                classNames({
                                    'error': this.state.lastNameError
                                })
                            }>
                                Last Name
                                <input type="text"
                                       id="first-name"
                                       defaultValue={this.props.user.lastName}
                                       ref={(input) => this.lastName = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.lastNameError,formService.errorMessages.empty)}
                            <label className={
                                classNames({
                                    'error': this.state.passwordError
                                })
                            }>
                                Password
                                <input type="password"
                                       id="password"
                                       ref={(input) => this.password = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.passwordError,formService.errorMessages.password)}
                            <label className={
                                classNames({
                                    'error': this.state.repeatPasswordError
                                })
                            }>
                                Repeat Password
                                <input type="password"
                                       id="repeat-password"
                                       ref={(input) => this.repeatPassword = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.repeatPasswordError,formService.errorMessages.repeatPassword)}
                            <button type="submit" value="Submit" className="standard-button">Update Profile</button>
                            {this.renderFormMessages()}
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <h3>Recent Workouts</h3>
                    </div>
                </div>
            </main>
        );
    }
}

export default Profile;