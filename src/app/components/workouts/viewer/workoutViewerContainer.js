import {connect} from 'react-redux';

import { actions as workoutActions } from '../../../ducks/ducks/workout';
import store from '../../../ducks/webStore';

import Workout from './workoutViewer';

const mapStateToProps = (state) => {
    return ({
        currentWorkout: state.workoutState.currentWorkout,
        response: state.workoutState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        getWorkoutData: (workoutId) => {
            dispatch(workoutActions.getWorkoutById(store, workoutId));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workout);