import React, { Component } from 'react';
import { Link } from 'react-router';

import userService from '../../services/user';

class Dashboard extends Component {
    render() {
        return (
            <main id="container-dashboard" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            Welcome back {userService.getUserFullName(this.props.user)}.
                        </h1>
                    </div>
                    <div className="col-sm-12 text-center">
                        <Link to="/workout">
                            <button className="standard-button" type="button">Start Workout</button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;