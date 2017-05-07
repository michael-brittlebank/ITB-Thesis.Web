import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ForgotPasswordModalContainer from './forgotPassword/forgotPasswordModalContainer';

import validationService from '../../services/validation';
import errorService from '../../services/errors';

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
            passwordError: !validationService.isValidPassword(password)
        });
        if (validationService.isValidEmail(email) && validationService.isValidPassword(password)) {
            this.props.handleLoginSubmit(email, password);
        }
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.isLoggedIn){
            //redirect after login
            return browserHistory.push('dashboard');
        }
        this.setState({
            submissionError: nextProps.error && nextProps.error.length > 0
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
                        <form onSubmit={this.handleSubmit} className="standard-form">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                                   id="email"
                                   defaultValue={this.props.user.email}
                                   ref={(input) => this.email = input}
                                   className={""+(this.state.emailError ? 'error' : '')}/>
                            {errorService.getInputErrorMessage(this.state.emailError,errorService.errorMessages.email)}
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   id="password"
                                   defaultValue={this.props.user.password}
                                   ref={(input) => this.password = input}
                                   className={""+(this.state.passwordError ? 'error' : '')}/>
                            {errorService.getInputErrorMessage(this.state.passwordError,errorService.errorMessages.password)}
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                            {errorService.getFormErrorMessage(this.state.submissionError,'Login failed.  Please double-check email and password')}
                            <p>
                                <a href="#m--forgot-password">Forgot Password?</a>
                            </p>
                        </form>
                    </section>
                </div>
                <ForgotPasswordModalContainer/>
            </main>
        );
    }
}

export default Login;
