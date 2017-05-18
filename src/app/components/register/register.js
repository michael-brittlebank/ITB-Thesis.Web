import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';

import validationService from '../../services/validation';
import formService from '../../services/form';
import responseService from '../../services/response';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            passwordError: false,
            submissionError: false,
            firstNameError: false,
            lastNameError: false,
            repeatPasswordError: null
        };
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    handleRegisterSubmit = (event) => {
        event.preventDefault();
        let emailValue = this.email.value,
            passwordValue = this.password.value,
            repeatPassword = this.repeatPassword.value,
            firstNameValue = this.firstName.value,
            lastNameValue = this.lastName.value,
            validEmail = validationService.isValidEmail(emailValue),
            validPassword = validationService.isValidPassword(passwordValue),
            validRepeatPassword = validationService.doPasswordsMatch(passwordValue, repeatPassword),
            validFirstName = !validationService.isValueEmpty(firstNameValue),
            validLastName = !validationService.isValueEmpty(lastNameValue);
        this.setState({
            emailError: !validEmail,
            passwordError: !validPassword,
            repeatPasswordError: !validRepeatPassword,
            firstNameError: !validFirstName,
            lastNameError: !validLastName,
            submissionError: null
        });
        if (validEmail && validPassword && validRepeatPassword && validFirstName && validLastName) {
            this.props.handleRegisterSubmit(firstNameValue, lastNameValue, emailValue, passwordValue);
        }
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            submissionError: responseService.responseHasError(nextProps.response)
        });
    }

    render() {
        return (
            <main id="container-login" className="grid-container">
                <div className="row">
                    <section className="col-sm-12 col-md-6">
                        <h1>Register</h1>
                        <IndexLink to="/">
                            &lt; Login
                        </IndexLink>
                        <form onSubmit={this.handleRegisterSubmit} className="standard-form">
                            <label className={
                                classNames({
                                    'error': this.state.firstNameError
                                })
                            }>
                                First Name
                                <input type="text"
                                       id="first-name"
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
                                       ref={(input) => this.lastName = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.lastNameError,formService.errorMessages.empty)}
                            <label className={
                                classNames({
                                    'error': this.state.emailError
                                })
                            }>
                                Email Address
                                <input type="email"
                                       id="email"
                                       ref={(input) => this.email = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.emailError,formService.errorMessages.email)}
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
                            <button type="submit" value="Submit" className="standard-button">Register</button>
                            {formService.getFormErrorMessage(this.state.submissionError,formService.errorMessages.register)}
                        </form>
                    </section>
                </div>
            </main>
        );
    }
}

export default Register;
