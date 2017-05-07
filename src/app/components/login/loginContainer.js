import {connect} from 'react-redux';

import store from '../../../store';
import { actions } from '../../ducks/user';
import HelperService from '../../services/helper';
import authorizationService from '../../services/authorization';

import Login from './login';

const mapStateToProps = (state) => {
    let userState = state.userState,
        user = HelperService.isDevelopment()?{email: 'admin@test.com',password: 'pass123'}:userState.user;
    return ({
        user: user,
        error: userState.error,
        isLoggedIn: authorizationService.isUserLoggedIn(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleLoginSubmit: (email, password) => {
            store.dispatch(actions.login(email, password));
        },
        resetForgotPasswordModal: () => {
            store.dispatch(actions.forgotPasswordReset());
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);