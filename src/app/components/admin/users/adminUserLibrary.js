import React, { Component } from 'react';
import { Link } from 'react-router';

import userService from '../../../services/user';
import helperService from '../../../services/helper';

class AdminUserLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
          users: this.props.users
        };
        this.handleDeleteUserSubmit = this.handleDeleteUserSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getUsersData(1);
    }

    componentWillReceiveProps(nextProps){
        this.state = {
            users: nextProps.users
        };
    }

    //events
    //---------------------------------
    handleDeleteUserSubmit = (userId) => {
        if(confirm('Are you sure you want to delete this user?')) {
            this.props.deleteUserSubmit(userId);
        }
    };


    //renders
    //---------------------------------
    renderUsersData() {
        let currentUser = this.props.currentUser,
            users = this.state.users.map((user,index) => {
                let deleteButton = user.id === currentUser.id?(
                    <Link to="/profile"><button className="standard-button">Profile</button></Link>
                ):(
                    <button type="button" className="standard-button danger" onClick={() => this.handleDeleteUserSubmit(user.id)}>Delete</button>
                );
                return (
                    <tr key={index}>
                        <td>{userService.getUserFullName(user)}</td>
                        <td>{helperService.capitalizeFirstLetter(user.role.toLowerCase())}</td>
                        <td>{helperService.formatTimestamp(user.lastModified)}</td>
                        <td>{deleteButton}</td>
                    </tr>
                )
            });
        return (
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Role</td>
                    <td>Last Active</td>
                    <td>Delete</td>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <main id="container-admin-dashboard" className="grid-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>
                            Users
                        </h1>
                    </div>
                    <div className="col-sm-12">
                        {this.renderUsersData()}
                    </div>
                </div>
            </main>
        );
    }
}

export default AdminUserLibrary;