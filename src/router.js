import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './app/ducks/webStore';
import MiddlewareService from './app/services/middleware';
import authorizationService from './app/services/authorization';

// Layouts
import MainLayout from './app/layouts/main';

// Views
import LoginContainer from './app/components/login/loginContainer';
import DashboardContainer from './app/components/dashboard/dashboardContainer';
import NotFound from './app/components/shared/notFound';
import WorkoutContainer from './app/components/workouts/workoutContainer';
import ProfileContainer from './app/components/profile/profileContainer';
import WorkoutLibraryContainer from './app/components/workouts/workoutLibrary';
import RegisterContainer from './app/components/register/registerContainer';
import AdminDashboardContainer from './app/components/admin/adminDashboardContainer';
import AdminExerciseLibraryContainer from './app/components/admin/exercises/adminExerciseLibraryContainer';
import AdminUserLibraryContainer from './app/components/admin/users/adminUserLibraryContainer';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

//unsubscribe action listener
store.subscribe(function(){
    let unauthorizedRoutes = [
        '/',
        '/register'
    ];
    if (!authorizationService.isUserLoggedIn(store.getState()) && unauthorizedRoutes.indexOf(browserHistory.getCurrentLocation().pathname) === -1) {
        browserHistory.push('/');
    }
});

export default (
    <Provider store={store}>
        <Router history={history}>
            {/*logged in*/}
            <Route component={MainLayout} onEnter={MiddlewareService.isUserLoggedInMiddleware}>
                <Route path="dashboard" component={DashboardContainer}/>
                <Route path="profile" component={ProfileContainer}/>
                {/*workouts*/}
                <Route path="workout" component={WorkoutContainer}/>
                <Route path="workouts" component={WorkoutLibraryContainer}/>
            </Route>
            {/*admin*/}
            <Route path="admin" component={MainLayout} onEnter={MiddlewareService.isUserAdminMiddleware}>
                <IndexRoute component={AdminDashboardContainer} />
                <Route path="exercises" component={AdminExerciseLibraryContainer}/>
                <Route path="users" component={AdminUserLibraryContainer}/>
            </Route>
            {/*misc*/}
            <Route path="/" onEnter={MiddlewareService.isUserLoggedInRedirectMiddleware}>
                <IndexRoute component={LoginContainer} />
                <Route path="register" component={RegisterContainer}/>
            </Route>
            <Route component={MainLayout}>
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    </Provider>
);