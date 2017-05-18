import React, { Component } from 'react';
import classNames from 'classnames';

import formService from '../../services/form';
import validationService from '../../services/validation';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            submissionError: false,
            submissionSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.email.value;
        this.setState({
            emailError: !validationService.isValidEmail(email)
        });
        if (validationService.isValidEmail(email)) {
            this.props.handleForgotPasswordSubmit(email);
        }
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            submissionError: nextProps.error.hasOwnProperty('success') && nextProps.forgotPassword.success === false,
            submissionSuccess: nextProps.forgotPassword.hasOwnProperty('success') && nextProps.forgotPassword.success === true,
        });
    }

    render() {
        return (
            <main id="container-profile" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            My profile
                        </h1>
                    </div>
                    <div className="col-sm-6">
                        <h3>Personal Details</h3>
                        <label className={
                            classNames({
                                'error': this.state.emailError
                            })
                        }>
                            Email
                            <input type="email"
                                   id="forgot-password-email"
                                   defaultValue={this.props.user.email}
                                   ref={(input) => this.email = input}/>
                        </label>
                        {formService.getInputErrorMessage(this.state.emailError,formService.errorMessages.email)}
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