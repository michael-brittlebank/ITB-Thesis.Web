import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import MiddlewareService from './app/services/middleware';

// Layouts
import MainLayout from './app/layouts/main';

// Views
import LoginContainer from './app/components/login/loginContainer';
import DashboardContainer from './app/components/dashboard/dashboardContainer';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" name="login" component={LoginContainer} />
            <Route component={MainLayout} onEnter={MiddlewareService.isUserLoggedInMiddleware}>
                <Route path="dashboard" name="dashboard" component={DashboardContainer}/>
            </Route>
        </Router>
    </Provider>
);