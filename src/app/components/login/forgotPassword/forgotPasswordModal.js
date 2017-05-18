import React, { Component } from 'react';
import classNames from 'classnames';

import validationService from '../../../services/validation';
import formService from '../../../services/form';
import responseService from '../../../services/response';

class ForgotPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            submissionSuccess: null
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
            submissionError: responseService.responseHasError(nextProps.response),
        });
    }

    renderFormMessages(){
        if (this.state.submissionError === true){
            return formService.getFormErrorMessage(true,'Forgot Password request failed.  Please try again later');
        } else if (this.state.submissionError === false){
            //reset form
            this.email.value = '';
            return formService.getFormSuccessMessage(true,'An email has been sent with instructions for resetting your password');
        } else {
            //default
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
                            <label className={
                                classNames({
                                    'error': this.state.emailError
                                })
                            }>
                                Email address
                                <input type="email"
                                       id="forgot-password-email"
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
