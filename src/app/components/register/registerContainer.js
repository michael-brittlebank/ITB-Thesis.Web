import {connect} from 'react-redux';

import { actions } from '../../ducks/user';
import authorizationService from '../../services/authorization';

import Register from './register';

const mapStateToProps = (state) => {
    let userState = state.userState;
    return ({
        user: userState.currentUser,
        response: userState.response,
        isLoggedIn: authorizationService.isUserLoggedIn(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleRegisterSubmit: (email, password) => {
            dispatch(actions.register(email, password));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);