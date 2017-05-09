import React, { Component } from 'react';
import { Link } from 'react-router';

import userService from '../../services/user';

class Dashboard extends Component {
    render() {
        return (
            <main id="container-dashboard" className="grid-container">
                <div className="row">
                    <div className="col-sm-6">
                        <p>
                            Hello {userService.getUserFullName(this.props.user)}.
                        </p>
                        <p>
                            Welcome back.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Link to="/workout">
                            <button className="standard-button" type="button">Start Workout</button>
                        </Link>
                    </div>
                    <div className="col-sm-6">
                        <Link to="/profile">
                            <button className="standard-button" type="button">My Profile</button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;