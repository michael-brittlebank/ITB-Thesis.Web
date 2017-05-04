import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <main id="container-dashboard" className="grid-container">
                <div className="row" style={{padding: '100px 0'}}>
                    <div className="col-sm-6 text-white">
                        <p>
                            Hello {this.state.user.email}.
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