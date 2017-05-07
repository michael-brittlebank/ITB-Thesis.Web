import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ForgotPasswordModalContainer from './forgotPassword/forgotPasswordModalContainer';

import validationService from '../../services/validation';
import formService from '../../services/form';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            passwordError: false,
            submissionError: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.email.value,
            password = this.password.value;
        this.setState({
            emailError: !validationService.isValidEmail(email),
            passwordError: !validationService.isValidPassword(password),
            submissionError: false
        });
        if (validationService.isValidEmail(email) && validationService.isValidPassword(password)) {
            this.props.handleLoginSubmit(email, password);
        }
    };

    handleModalOpen = (event) => {
        this.props.resetForgotPasswordModal();
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.isLoggedIn){
            //redirect after login
            return browserHistory.push('dashboard');
        }
        this.setState({
            submissionError: !!nextProps.error
        });
    }

    render() {
        return (
            <main id="container-login" className="grid-container">
                <div className="row">
                    <section className="col-sm-6">
                        <h1>Workouts</h1>
                        <p>Fully featured interactive tool for workouts </p>
                    </section>
                    <section className="col-sm-6">
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit} className="standard-form">
                            <label className={""+(this.state.emailError ? 'error' : '')}>
                                Email Address
                                <input type="email"
                                       id="email"
                                       defaultValue={this.props.user.email}
                                       ref={(input) => this.email = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.emailError,formService.errorMessages.email)}
                            <label className={""+(this.state.passwordError ? 'error' : '')}>
                                Password
                                <input type="password"
                                       id="password"
                                       defaultValue={this.props.user.password}
                                       ref={(input) => this.password = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.passwordError,formService.errorMessages.password)}
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                            <p className="text-center">
                                <a onClick={this.handleModalOpen} href="#m--forgot-password">Forgot Password?</a>
                            </p>
                            {formService.getFormErrorMessage(this.state.submissionError,'Login failed.  Please double-check email and password')}
                        </form>
                    </section>
                </div>
                <ForgotPasswordModalContainer/>
            </main>
        );
    }
}

export default Login;
