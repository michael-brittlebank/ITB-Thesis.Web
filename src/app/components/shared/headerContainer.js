import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/ducks/user';
import userService from '../../services/user';

import Header from './header';

const mapStateToProps = (state) => {
    let user = state.userState.currentUser;
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