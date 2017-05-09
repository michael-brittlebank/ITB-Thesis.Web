import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (event) => {
        event.preventDefault();
        this.props.handleLogoutSubmit();
    };

    render() {
        return (
            <header className="grid-container">
                <nav className="row">
                    <div className="col-sm-8">
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                    <div className="col-sm-4 text-right">
                        <ul className="standard-menu">
                            <li>
                                <div className="i--icon-user">&nbsp;</div>
                                <p>Profile</p>
                                <ul className="sub-menu">
                                    <li onClick={this.handleLogout}>
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;