import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import Login from './login';

import HelperService from '../../services/helpers';
import authorizationService from '../../services/authorization';

class LoginContainer extends Component {
    render() {
        return <Login user={this.props.user} error={this.props.error} />;
    }
}

const mapStateToProps = (state) => {
    if (authorizationService.isUserLoggedIn(state)){
        return browserHistory.push('dashboard');
    }
    return {
        user: HelperService.isDevelopment()?{
            email: 'admin@test.com',
            password: 'pass123'
        }:state.userState.user,
        error: state.userState.error
    }
};

export default connect(
    mapStateToProps
)(LoginContainer);