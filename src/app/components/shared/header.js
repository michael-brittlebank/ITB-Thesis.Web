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

    //renders
    //-----------------------------
    renderAdminLink(){
        //admins only
        if (this.props.isAdmin){
            return (
                <li>
                    <Link to="/admin">
                        Admin
                    </Link>
                </li>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <header>
                <nav className="grid-container row">
                    <div className="col-sm-8">
                        <ul className="standard-menu">
                            <li>
                                <Link to="/dashboard" className="header-link">
                                    Logo
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-4 text-right">
                        <ul className="standard-menu">
                            <li>
                                <Link to="/profile" className="header-link">
                                    User
                                </Link>
                                <ul className="sub-menu right">
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                    {this.renderAdminLink()}
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