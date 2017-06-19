import {connect} from 'react-redux';

import { actions as workoutActions } from '../../ducks/ducks/workout';
import store from '../../ducks/webStore';

import Workout from './workout';

const mapStateToProps = (state) => {
    return ({
        exercises: state.workoutState.exercises,
        response: state.workoutState.response
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        getExercisesData: () => {
            dispatch(workoutActions.getExercises(store));
        },
        createWorkoutSubmit: (exercises) => {
            dispatch(workoutActions.saveWorkout(store, exercises));
        }
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workout);