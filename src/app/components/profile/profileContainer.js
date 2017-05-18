import {connect} from 'react-redux';

import { actions as userActions } from '../../ducks/user';

import Profile from './profile';

const mapStateToProps = (state) => {
    return ({
        user: state.userState.currentUser
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        handleUpdateSubmit: (firstName, lastName, password) => {
            dispatch(userActions.update(firstName, lastName, password));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);