import React, { Component } from 'react';
import _ from 'lodash';

import helperService from '../../services/helper';
import formService from '../../services/form';
import responseService from '../../services/response';

class Workout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: this.props.exercises,
            submissionError: null
        };
        this.handleCreateWorkoutSubmit = this.handleCreateWorkoutSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getExercisesData();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            exercises: nextProps.exercises
        });
        if (!!nextProps.response && nextProps.response.hasOwnProperty('request') && nextProps.response.request.responseURL.indexOf('exercises') === -1){
            this.setState({
                submissionError: responseService.responseHasError(nextProps.response)
            });
            if (responseService.responseHasError(nextProps.response) === false){
                //successful save
                this.workoutForm.reset();
            }
        }
    }

    //events
    //---------------------------------
    handleCreateWorkoutSubmit = (event) => {
        event.preventDefault();
        let formData = formService.serializeForm(this.workoutForm),
            exercises = [];
        _.forOwn(formData, function(value, key) {
            if (value > 0) {
                exercises.push({
                    id: key,
                    actualReps: value
                });
            }
        });
        if(exercises.length > 0) {
            this.props.createWorkoutSubmit(exercises);
        } else {
            this.setState({
                submissionError: true
            });
        }
    };


    //renders
    //---------------------------------
    renderExercises(){
        let inputWidth = '50px',
            exercises = this.state.exercises.map((exercise) => {
                return (
                    <tr>
                        <td>{helperService.capitalizeFirstLetter(exercise.name)}</td>
                        <td>{helperService.capitalizeFirstLetter(exercise.type)}</td>
                        <td width={inputWidth}>
                            <input
                                type="number"
                                max={100}
                                min={0}
                                defaultValue={0}
                                name={exercise.id}
                                className="text-center"
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
                    <td width={inputWidth}>Quantity</td>
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
                    <div className="col-sm-12 text-center">
                        <h1>
                            New Workout
                        </h1>
                    </div>
                    <div className="col-sm-12">
                        <form className="standard-form" onSubmit={this.handleCreateWorkoutSubmit} ref={el => this.workoutForm = el}>
                            {this.renderExercises()}
                            <div className="text-center">
                                <button type="submit" className="standard-button">Submit</button>
                            </div>
                            {formService.getFormErrorMessage(this.state.submissionError,'Please enter at least one exercise value')}
                            {formService.getFormSuccessMessage(this.state.submissionError === false,'Workout successfully saved.')}
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}

export default Workout;