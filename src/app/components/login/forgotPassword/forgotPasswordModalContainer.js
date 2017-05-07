import {connect} from 'react-redux';

import store from '../../../../store';
import { actions } from '../../../ducks/user';

import ForgotPasswordModal from './forgotPasswordModal';

const mapStateToProps = (state) => {
    console.log('modal state',state);
    let userState = state.userState;
    return ({
        user: userState.user,
        error: userState.error
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