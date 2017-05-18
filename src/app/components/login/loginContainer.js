import {connect} from 'react-redux';

import { actions } from '../../ducks/user';
import HelperService from '../../services/helper';
import authorizationService from '../../services/authorization';

import Login from './login';

const mapStateToProps = (state) => {
    let userState = state.userState,
        user = HelperService.isDevelopment()?{email: 'admin@test.com',password: 'pass123'}:userState.currentUser;
    return ({
        user: user,
        response: userState.response,
        isLoggedIn: authorizationService.isUserLoggedIn(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleLoginSubmit: (email, password) => {
            dispatch(actions.login(email, password));
        },
        resetForgotPasswordModal: () => {
            dispatch(actions.forgotPasswordReset());
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);