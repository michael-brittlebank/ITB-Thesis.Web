import { Component } from 'react';

class UsersService extends Component {
    static getUserFullName(user) {
        return user.firstName+' '+user.lastName;
    }

    static isUserAdmin(user){
        return user && user.hasOwnProperty('role') && user.role === 'ADMIN';
    }
}

export default UsersService;