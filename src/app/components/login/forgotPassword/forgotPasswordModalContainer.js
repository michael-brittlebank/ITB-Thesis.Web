import {connect} from 'react-redux';

import { actions as userActions } from '../../../ducks/user';

import ForgotPasswordModal from './forgotPasswordModal';

const mapStateToProps = (state) => {
    return ({
        response: state.userState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleForgotPasswordSubmit: (email) => {
            dispatch(userActions.forgotPasswordRequest(email));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordModal);