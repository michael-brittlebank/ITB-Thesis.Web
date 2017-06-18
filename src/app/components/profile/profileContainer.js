import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/ducks/user';
import store from '../../ducks/webStore';

import Profile from './profile';

const mapStateToProps = (state) => {
    return ({
        user: state.userState.currentUser,
        response: state.userState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleUpdateSubmit: (firstName, lastName, password) => {
            dispatch(userActions.update(store, firstName, lastName, password));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);