import React, { Component } from 'react';
import { Link } from 'react-router';

import helperService from '../../../services/helper';

class Workout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWorkout: this.props.currentWorkout,
            submissionError: null
        };
    }

    componentDidMount() {
        this.props.getWorkoutData(parseInt(this.props.params.workoutId, 10));
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            currentWorkout: nextProps.currentWorkout
        });
    }


    //renders
    //---------------------------------
    renderExercises(){
        let inputWidth = '50px',
            exercises = !!this.state.currentWorkout.exercises && this.state.currentWorkout.exercises.length > 0 && this.state.currentWorkout.exercises.map((exercise) => {
                return (
                    <tr>
                        <td>{helperService.capitalizeFirstLetter(exercise.name)}</td>
                        <td>{helperService.capitalizeFirstLetter(exercise.type)}</td>
                        <td width={inputWidth}>
                            <input
                                type="number"
                                max={100}
                                min={0}
                                defaultValue={exercise.actualReps}
                                name={exercise.id}
                                className="text-center"
                                disabled={true}
                            />
                        </td>
                    </tr>
                );
            });
        return (
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Type</td>
                    <td width={inputWidth}>Reps</td>
                </tr>
                </thead>
                <tbody>
                {exercises}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <main id="container-profile" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <Link to="/workouts">
                            <button className="standard-button">Back</button>
                        </Link>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h1>
                            View Workout
                        </h1>
                    </div>
                    <div className="col-sm-12">
                        {this.renderExercises()}
                    </div>
                </div>
            </main>
        );
    }
}

export default Workout;