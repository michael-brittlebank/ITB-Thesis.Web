import React from 'react';

import HeaderContainer from '../components/shared/header';
import FooterContainer from '../components/shared/footer';

const MainLayout = React.createClass({
    render: function() {
        return (
            <div>
                <HeaderContainer/>
                {this.props.children}
                <FooterContainer/>
            </div>
        );
    }
});

export default MainLayout;