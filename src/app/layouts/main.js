import React from 'react';

import HeaderContainer from '../components/shared/headerContainer';
import FooterContainer from '../components/shared/footerContainer';

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