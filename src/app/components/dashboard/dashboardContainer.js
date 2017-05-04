import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

class DashboardContainer extends Component {
    render() {
        return (
            <Dashboard user={this.props.user}/>
        );
    }
}

export default connect(mapStateToProps)(DashboardContainer);