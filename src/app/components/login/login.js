import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ForgotPasswordModal from './forgotPasswordModal';

import validationService from '../../services/validation';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            passwordError: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        //todo, error messages
        event.preventDefault();
        let email = this.email.value,
            password = this.password.value,
            errors = 0;
        this.setState({
            emailError: !validationService.isValidEmail(email),
            passwordError: !validationService.isValidPassword(password)
        });
        if(!validationService.isValidEmail(email)){
            errors++;
        }
        if(!validationService.isValidPassword(password)){
            errors++;
        }
        if (errors < 1) {
            this.props.handleSubmit(event, email, password);
        }
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.isLoggedIn){
            //redirect after login
            return browserHistory.push('dashboard');
        }
        switch (nextProps.error){
            case 401:
                //todo, open modal
                alert('unauthorized');
                break;
            default:
        }
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
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   id="password"
                                   defaultValue={this.props.user.password}
                                   ref={(input) => this.password = input}
                                   className={""+(this.state.passwordError ? 'error' : '')}/>
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                            <p>
                                <a href="#m--forgot-password">Forgot Password?</a>
                            </p>
                        </form>
                    </section>
                </div>
                <ForgotPasswordModal/>
            </main>
        );
    }
}

export default Login;
