import {connect} from 'react-redux';

import { actions } from '../../../ducks/user';

import ForgotPasswordModal from './forgotPasswordModal';

const mapStateToProps = (state) => {
    let userState = state.userState;
    return ({
        forgotPassword: userState.forgotPassword
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleForgotPasswordSubmit: (email) => {
            dispatch(actions.forgotPasswordRequest(email));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordModal);