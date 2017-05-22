import React, { Component } from 'react';
import _ from 'lodash';

import userService from '../../../services/user';
import helperService from '../../../services/helper';

class AdminUserLibrary extends Component {

    componentDidMount() {
        this.props.getUsersData(1);
    }

    componentWillReceiveProps(nextProps){

    }

    renderUsersData() {
        let users = _.map(this.props.users,function(user,index){
            return (
                <tr key={index}>
                    <td>{userService.getUserFullName(user)}</td>
                    <td>{helperService.capitalizeFirstLetter(user.role.toLowerCase())}</td>
                    <td>{helperService.formatTimestamp(user.lastModified)}</td>
                    <td><button type="button" className="standard-button danger">Delete</button></td>
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