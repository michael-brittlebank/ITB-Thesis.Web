import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/user';

import Header from './header';

const mapStateToProps = (state) => {
    return ({
    });
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