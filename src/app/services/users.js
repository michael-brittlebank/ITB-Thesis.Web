import { Component } from 'react';

class UsersService extends Component {
    static getUserFullName(user) {
        return user.firstName+' '+user.lastName;
    }
}

export default UsersService;