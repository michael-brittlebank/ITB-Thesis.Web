import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/ducks/user';
import HelperService from '../../services/helper';
import store from '../../ducks/webStore';
import authorizationService from '../../services/authorization';

import Login from './login';

const mapStateToProps = (state) => {
    let userState = state.userState,
        user = HelperService.isDevelopment()?{email: 'admin@test.com',password: 'pass123'}:userState.currentUser;
    return ({
        user: user,
        userIsLoggedIn: authorizationService.isUserLoggedIn(state),
        response: userState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleLoginSubmit: (email, password) => {
            dispatch(userActions.login(store, email, password));
        },
        resetUserResponse: () => {
            dispatch(userActions.resetResponse());
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);