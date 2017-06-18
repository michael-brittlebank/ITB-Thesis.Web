import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/ducks/user';
import store from '../../ducks/webStore';

import Register from './register';

const mapStateToProps = (state) => {
    let userState = state.userState;
    return ({
        user: userState.currentUser,
        response: userState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleRegisterSubmit: (firstName, lastName, email, password) => {
            dispatch(userActions.register(store, firstName, lastName, email, password));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);