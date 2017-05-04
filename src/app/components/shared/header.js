import React from 'react';
import { Link } from 'react-router';

const Header = React.createClass({
    render: function() {
        return (
            <header className="grid-container">
                <nav className="row text-white">
                    <div className="col-sm-8">
                        <Link to="/dashboard" activeClassName="active">
                           Dashboard
                        </Link>
                    </div>
                    <div className="col-sm-4 text-right">
                        <div className="i--icon-user">&nbsp;</div>
                        <p>Profile</p>
                    </div>
                </nav>
            </header>
        );
    }
});

export default Header;