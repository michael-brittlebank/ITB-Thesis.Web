import {connect} from 'react-redux';

import store from '../../../../store';
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
            store.dispatch(actions.forgotPasswordRequest(email));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordModal);