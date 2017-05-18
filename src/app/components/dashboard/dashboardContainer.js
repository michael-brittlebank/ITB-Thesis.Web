import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = function(store) {
    return {
        user: store.userState.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return({

    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);