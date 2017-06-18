import { connect } from 'react-redux';
import AdminUserLibrary from './adminUserLibrary';

import { actions as adminActions } from '../../../ducks/ducks/admin';
import store from '../../../ducks/webStore';

const mapStateToProps = function(store) {
    return {
        users: store.adminState.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        getUsersData: (page) => {
            dispatch(adminActions.getUsers(store, page));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUserLibrary);