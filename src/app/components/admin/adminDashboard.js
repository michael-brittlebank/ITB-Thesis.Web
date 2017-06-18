import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminDashboard extends Component {
    render() {
        return (
            <main id="container-admin-dashboard" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            Admin Panel
                        </h1>
                    </div>
                    <div className="col-sm-12 text-center">
                        <Link to="/admin/users" className="standard-button">Users library</Link>
                        {/*<Link to="/admin/exercises">Exercise library</Link>*/}
                    </div>
                </div>
            </main>
        );
    }
}

export default AdminDashboard;