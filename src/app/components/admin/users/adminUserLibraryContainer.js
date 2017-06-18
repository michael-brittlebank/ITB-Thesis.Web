import { connect } from 'react-redux';
import AdminUserLibrary from './adminUserLibrary';

import { actions as adminActions } from '../../../ducks/ducks/admin';
import store from '../../../ducks/webStore';

const mapStateToProps = function(store) {
    return {
        currentUser: store.userState.currentUser,
        users: store.adminState.users,
        response: store.adminState.response
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        getUsersData: (page) => {
            dispatch(adminActions.getUsers(store, page));
        },
        deleteUserSubmit: (userId) => {
            dispatch(adminActions.deleteUserById(store,userId));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUserLibrary);