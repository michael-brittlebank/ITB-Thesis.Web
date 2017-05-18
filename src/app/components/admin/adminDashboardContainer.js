import { connect } from 'react-redux';
import AdminDashboard from './adminDashboard';

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
)(AdminDashboard);