import { connect } from 'react-redux';
import AdminUserLibrary from './adminUserLibrary';

import { actions as adminActions } from '../../../ducks/admin';

const mapStateToProps = function(store) {
    return {
        users: store.adminState.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        getUsersData: (page) => {
            dispatch(adminActions.getUsers(page));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUserLibrary);