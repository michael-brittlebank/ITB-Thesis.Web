import React, { Component } from 'react';
import store from '../../../store';
import { actions } from '../../ducks/user';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        //todo, proper validation
        //todo, proper error messages
        event.preventDefault();
        let email = this.email.value,
            password = this.password.value,
            errors = 0;
        if (!email || email.length < 1){
            errors++;
        }
        if (!password || password.length < 1) {
            errors++;
        }
        if (errors < 1) {
            store.dispatch(actions.login(email, password));
        } else {
            alert('invalid form');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('recieved proprs',nextProps);
        if (nextProps.error){
            //todo, proper digest of login error
        }
        // if (usersService.){
        //
        // }
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
