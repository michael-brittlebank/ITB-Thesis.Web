import {connect} from 'react-redux';

import store from '../../../store';
import { actions } from '../../ducks/user';
import HelperService from '../../services/helpers';
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
        handleSubmit: (event, email, password) => {
            //todo, proper validation
            //todo, proper error messages
            event.preventDefault();
            let errors = 0;
            if (!email || email.length < 1){
                errors++;
            }
            if (!password || password.length < 1) {
                errors++;
            }
            if (errors < 1) {
                store.dispatch(actions.login(email, password));
            } else {
                alert('invalid form');
            }
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);