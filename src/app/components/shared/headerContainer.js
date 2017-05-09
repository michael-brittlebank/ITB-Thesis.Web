import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/user';
import userService from '../../services/user';

import Header from './header';

const mapStateToProps = (state) => {
    let user = state.userState.user;
    return {
        user: user,
        isAdmin: userService.isUserAdmin(user)
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleLogoutSubmit: () => {
            dispatch(userActions.logout());
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);