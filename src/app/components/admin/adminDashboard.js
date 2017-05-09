import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminDashboard extends Component {
    render() {
        return (
            <main id="container-admin-dashboard" className="grid-container">
                <div className="row">
                    <div className="col-sm-6">
                        <p>
                            Admin
                        </p>
                        <Link to="admin/users">Users library</Link>
                        <Link to="admin/exercises">Exercise library</Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default AdminDashboard;