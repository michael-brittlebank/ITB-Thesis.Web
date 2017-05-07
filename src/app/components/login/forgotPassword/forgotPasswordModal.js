import React, { Component } from 'react';

import validationService from '../../../services/validation';
import errorService from '../../../services/errors';

class ForgotPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false
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

    render() {
        return (
            <section className="modal--fade"
                     id="m--forgot-password"
                     data-stackable="false"
                     tabIndex="-1"
                     role="dialog"
                     aria-labelledby="label-fade"
                     aria-hidden="true">
                <div className="modal-inner">
                    <div className="modal-content">
                        <h2 id="label-fade">Forgot Password?</h2>
                        <form onSubmit={this.handleSubmit} className="standard-form">
                            <label className={""+(this.state.emailError ? 'error' : '')}>
                                Email address
                                <input type="email"
                                       id="forgot-password-email"
                                       defaultValue={this.props.user.email}
                                       ref={(input) => this.email = input}/>
                            </label>
                            {errorService.getInputErrorMessage(this.state.emailError,errorService.errorMessages.email)}
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                            {errorService.getFormErrorMessage(this.state.submissionError,'Forgot Password request failed.  Please try again later')}
                        </form>
                    </div>
                </div>
                <a href="#!" className="modal-close" title="Close this modal" data-dismiss="modal" data-close="Close">&times;</a>
            </section>
        );
    }
}

export default ForgotPasswordModal;
