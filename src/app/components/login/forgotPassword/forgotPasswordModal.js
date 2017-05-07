import React, { Component } from 'react';

import validationService from '../../../services/validation';
import formService from '../../../services/form';

class ForgotPasswordModal extends Component {
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
            submissionError: nextProps.forgotPassword.hasOwnProperty('success') && nextProps.forgotPassword.success === false,
            submissionSuccess: nextProps.forgotPassword.hasOwnProperty('success') && nextProps.forgotPassword.success === true,
        });
    }

    renderFormMessages(){
        if(this.props.forgotPassword.hasOwnProperty('success')){
            if (this.props.forgotPassword.success === false){
                return formService.getFormErrorMessage(this.state.submissionError,'Forgot Password request failed.  Please try again later');
            } else {
                //reset form
                this.email.value = '';
                return formService.getFormSuccessMessage(this.state.submissionSuccess,'An email has been sent with instructions for resetting your password');
            }
        } else {
            return formService.getFormErrorMessage(false,'');
        }
    }

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
                                       defaultValue={this.props.forgotPassword.email}
                                       ref={(input) => this.email = input}/>
                            </label>
                            {formService.getInputErrorMessage(this.state.emailError,formService.errorMessages.email)}
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                            {this.renderFormMessages()}
                        </form>
                    </div>
                </div>
                <a href="#!" className="modal-close" title="Close this modal" data-dismiss="modal" data-close="Close">&times;</a>
            </section>
        );
    }
}

export default ForgotPasswordModal;
