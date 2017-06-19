import {connect} from 'react-redux';

import { actions as workoutActions } from '../../../ducks/ducks/workout';
import store from '../../../ducks/webStore';

import WorkoutLibrary from './workoutLibrary';

const mapStateToProps = (state) => {
    return ({
        workouts: state.workoutState.workouts,
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        getWorkoutsData: () => {
            dispatch(workoutActions.getWorkouts(store));
        },
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutLibrary);