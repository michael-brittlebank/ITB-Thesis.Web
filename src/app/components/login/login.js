import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        let email = this.email.value,
            password = this.password.value;
        this.props.handleSubmit(event, email, password);
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.isLoggedIn){
            //redirect after login
            return browserHistory.push('dashboard');
        }
        //todo, proper digest of login error
    }

    render() {
        return (
            <main id="container-login" className="grid-container">
                <div className="row">
                    <section className="col-sm-6">
                        <h1>Workouts</h1>
                        <p>Fully featured interactive tool for workouts </p>
                    </section>
                    <section className="col-sm-6">
                        <form onSubmit={this.handleSubmit} className="standard-form">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" defaultValue={this.props.user.email} ref={(input) => this.email = input}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" defaultValue={this.props.user.password} ref={(input) => this.password = input}/>
                            <button type="submit" value="Submit" className="standard-button">Submit</button>
                        </form>
                    </section>
                </div>
            </main>
        );
    }
}

export default Login;
