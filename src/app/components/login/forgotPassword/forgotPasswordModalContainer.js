import {connect} from 'react-redux';

import { actions } from '../../../ducks/user';

import ForgotPasswordModal from './forgotPasswordModal';

const mapStateToProps = (state) => {
    return ({
        response: state.userState.response
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