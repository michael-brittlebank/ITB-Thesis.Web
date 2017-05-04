import React from 'react';

import Header from '../components/shared/header.js';

const MainLayout = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
});

export default MainLayout;