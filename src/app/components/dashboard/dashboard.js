import React, { Component } from 'react';
import userService from '../../services/user';

class Dashboard extends Component {
    render() {
        return (
            <main id="container-dashboard" className="grid-container">
                <div className="row" style={{padding: '100px 0'}}>
                    <div className="col-sm-6">
                        <p>
                            Hello {userService.getUserFullName(this.props.user)}.
                        </p>
                        <p>
                            Welcome back.
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;