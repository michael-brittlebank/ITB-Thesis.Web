import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import MiddlewareService from './app/services/middleware';

// Layouts
import MainLayout from './app/layouts/main';

// Views
import LoginContainer from './app/components/login/loginContainer';
import DashboardContainer from './app/components/dashboard/dashboardContainer';
import NotFound from './app/components/shared/notFound';
import WorkoutContainer from './app/components/workouts/workoutContainer';
import ProfileContainer from './app/components/profile/profileContainer';
import WorkoutLibraryContainer from './app/components/workouts/workoutLibrary';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" name="login" component={LoginContainer} />
            <Route component={MainLayout} onEnter={MiddlewareService.isUserLoggedInMiddleware}>
                <Route path="/dashboard" name="dashboard" component={DashboardContainer}/>
                <Route path="/profile" name="profile" component={ProfileContainer}/>
                //workouts
                <Route path="/workout" name="workout" component={WorkoutContainer}/>
                <Route path="/workouts" name="workout-library" component={WorkoutLibraryContainer}/>
                //misc
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    </Provider>
);