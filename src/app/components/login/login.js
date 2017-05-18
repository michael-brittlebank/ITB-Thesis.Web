import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import ForgotPasswordModalContainer from './forgotPassword/forgotPasswordModalContainer';

import validationService from '../../services/validation';
import formService from '../../services/form';
import responseService from '../../services/response';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            password: this.props.user.password,
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
        this.props.resetUserResponse();
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
                    <section className="col-sm-12">
                        <h1>Workouts</h1>
                        <p>Fully featured interactive tool for workouts </p>
                    </section>
                    <section className="col-sm-12 col-md-6">
                        <h3>Login</h3>
                        <form onSubmit={this.handleSubmit} className="standard-form">
                            <label className={
                                classNames({
                                    'error': this.state.emailError
                                })
                            }>
                                Email Address
                                <input type="email"
                                       id="email"
                                       defaultValue={this.state.email}
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
                                       defaultValue={this.state.password}
                                       ref={(input) => this.password = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.passwordError,formService.errorMessages.password)}
                            <button type="submit" value="Submit" className="standard-button">Login</button>
                            <p className="text-center">
                                <a onClick={this.handleModalOpen} href="#m--forgot-password">Forgot Password?</a>
                            </p>
                            <p className="text-center">
                                <Link to="register">
                                    Don't have an account? Sign Up!
                                </Link>
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
