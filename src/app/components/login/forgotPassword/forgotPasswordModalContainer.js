import {connect} from 'react-redux';

import { actions as userActions } from '../../../ducks/ducks/user';
import store from '../../../ducks/webStore';

import ForgotPasswordModal from './forgotPasswordModal';

const mapStateToProps = (state) => {
    return ({
        response: state.userState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleForgotPasswordSubmit: (email) => {
            dispatch(userActions.forgotPasswordRequest(store, email));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordModal);