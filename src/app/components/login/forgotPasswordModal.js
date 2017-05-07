import React, { Component } from 'react';

class ForgotPasswordModal extends Component {
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
                        <p>Enter email address</p>
                    </div>
                </div>
                <a href="#!" className="modal-close" title="Close this modal" data-dismiss="modal" data-close="Close">&times;</a>
            </section>
        );
    }
}

export default ForgotPasswordModal;
