import React, { Component } from 'react';
import Login from './login';
import {connect} from 'react-redux';
import HelperService from '../../services/helpers';

class LoginContainer extends Component {
    render() {
        return <Login user={this.props.user} error={this.props.error} />;
    }
}

const mapStateToProps = (state) => {
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