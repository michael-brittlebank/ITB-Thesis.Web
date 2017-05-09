import React, { Component } from 'react';
import { browserHistory, IndexLink } from 'react-router';

import validationService from '../../services/validation';
import formService from '../../services/form';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            passwordError: false,
            submissionError: false
        };
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    handleRegisterSubmit = (event) => {
        event.preventDefault();
        let email = this.email.value,
            password = this.password.value;
        this.setState({
            emailError: !validationService.isValidEmail(email),
            passwordError: !validationService.isValidPassword(password),
            submissionError: false
        });
        if (validationService.isValidEmail(email) && validationService.isValidPassword(password)) {
            this.props.handleRegisterSubmit(email, password);
        }
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
                    <section className="col-sm-12 col-md-6">
                        <h1>Register</h1>
                        <IndexLink to="/">
                            &lt; Login
                        </IndexLink>
                        <form onSubmit={this.handleRegisterSubmit} className="standard-form">
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
                            <button type="submit" value="Submit" className="standard-button">Register</button>
                            {formService.getFormErrorMessage(this.state.submissionError,'Login failed.  Please double-check email and password')}
                        </form>
                    </section>
                </div>
            </main>
        );
    }
}

export default Register;
