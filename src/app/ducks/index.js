import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Reducers
import userReducer from './user';

export default combineReducers({
    userState: userReducer,
    routing: routerReducer
});