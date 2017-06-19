import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class WorkoutLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workouts: this.props.workouts
        };
    }

    componentDidMount() {
        this.props.getWorkoutsData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            workouts: nextProps.workouts
        });
    }


    //renders
    //---------------------------------
    renderWorkouts(){
        console.log('rendering');
        let workouts = this.state.workouts.map((workout) => {
                return (
                    <tr>
                        <td>{moment(workout.dateCreated).format('DD/MM/YYYY @ hh:mm')}</td>
                        <td>{workout.exercises}</td>
                        <td>
                            <Link to={'/workout/'+workout.id}>
                                <button className="standard-button">View</button>
                            </Link>
                        </td>
                    </tr>
                );
            });
        return (
            <table>
                <thead>
                <tr>
                    <td>Date</td>
                    <td># of Exercises</td>
                    <td>View</td>
                </tr>
                </thead>
                <tbody>
                {workouts}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <main id="container-profile" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            Workout Library
                        </h1>
                    </div>
                    <div className="col-sm-12">
                        {this.renderWorkouts()}
                    </div>
                </div>
            </main>
        );
    }
}

export default WorkoutLibrary;