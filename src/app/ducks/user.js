import axios from 'axios';
import store from '../../store';
import { browserHistory } from 'react-router';

export const types = {
    LOGIN_REQUEST: 'USER/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USER/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER/LOGIN_FAILURE',
    PROFILE_REQUEST: 'USER/PROFILE_REQUEST',
    PROFILE_SUCCESS: 'USER/PROFILE_SUCCESS',
    PROFILE_FAILURE: 'USER/PROFILE_FAILURE',
    FORGOT_PASSWORD_REQUEST: 'USER/FORGOT_PASSWORD_REQUEST',
    FORGOT_PASSWORD_SUCCESS: 'USER/FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILURE: 'USER/FORGOT_PASSWORD_FAILURE',
    LOGOUT: 'USER/LOGOUT',
    RESET_RESPONSE: 'USER/RESET_RESPONSE',
    REGISTER_REQUEST: 'USER/REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USER/REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USER/REGISTER_FAILURE'
};

let defaultCurrentUser = {},
    defaultForgotPassword = {},
    defaultSessionToken = '',
    defaultResponse = '';

export const initialState = {
    currentUser: defaultCurrentUser,
    sessionToken: defaultSessionToken,
    isLoading: false,
    response: defaultResponse,
    forgotPassword: defaultForgotPassword
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
        case types.FORGOT_PASSWORD_REQUEST:
        case types.PROFILE_REQUEST:
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                response: defaultResponse
            };
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sessionToken: action.sessionToken
            };
        case types.PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.currentUser
            };
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case types.REGISTER_FAILURE:
        case types.FORGOT_PASSWORD_FAILURE:
        case types.PROFILE_FAILURE:
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case types.RESET_RESPONSE:
            return {
                ...state,
                response: defaultResponse
            };
        case types.LOGOUT:
            return initialState;
        default:
            return state
    }
}

export const actions = {
    getProfile: function(){
        let currentState = store.getState(),
            sessionToken = currentState.userState.sessionToken;
        return axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + '/user',
            headers: {'Authorization': 'Bearer ' + sessionToken}
        });
    },
    profile: function(){
        return function (dispatch) {
            dispatch({type: types.PROFILE_REQUEST});
            return actions.getProfile()
                .then((response) => {
                    dispatch({
                        type: types.PROFILE_SUCCESS,
                        currentUser: response.data
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.PROFILE_FAILURE,
                        response: error.response
                    });
                });
        };
    },
    login: function(email, password){
        return function (dispatch) {
            dispatch({type:types.LOGIN_REQUEST});
            return axios({
                method: 'POST',
                url: process.env.REACT_APP_API_URL+'/user',
                data: {
                    email: email,
                    password: password
                }
            })
                .then((response) => {
                    let sessionToken = response.data.sessionToken;
                    dispatch({
                        type: types.LOGIN_SUCCESS,
                        sessionToken: sessionToken
                    });
                    return store.dispatch(actions.profile());
                })
                .catch((error) => {
                    dispatch({
                        type: types.LOGIN_FAILURE,
                        response: error.response
                    });
                });
        };
    },
    logout: function(){
        return function (dispatch) {
            dispatch({type: types.LOGOUT});
            //redirect to login
            return browserHistory.push('/');
        };
    },
    forgotPasswordRequest: function(email){
        return function (dispatch) {
            dispatch({type: types.FORGOT_PASSWORD_REQUEST});
            return axios({
                method: 'POST',
                url: process.env.REACT_APP_API_URL + '/user/forgot-password',
                data: {
                    email: email
                }
            })
                .then((response) => {
                    dispatch({
                        type: types.FORGOT_PASSWORD_SUCCESS,
                        response: response
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.FORGOT_PASSWORD_FAILURE,
                        response: error.response
                    });
                });
        };
    },
    resetResponse: function(){
        return function (dispatch) {
            dispatch({type: types.RESET_RESPONSE});
        }
    },
    register: function(firstName, lastName, email, password){
        return function (dispatch) {
            dispatch({type:types.REGISTER_REQUEST});
            return axios({
                method: 'PUT',
                url: process.env.REACT_APP_API_URL+'/user',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            })
                .then((response) => {
                    let sessionToken = response.data.sessionToken;
                    dispatch({
                        type: types.REGISTER_SUCCESS,
                        sessionToken: sessionToken
                    });
                    return store.dispatch(actions.profile())
                        .then(function(){
                            return browserHistory.push('/dashboard');
                        });
                })
                .catch((error) => {
                    dispatch({
                        type: types.REGISTER_FAILURE,
                        response: error.response
                    });
                });
        };
    },
};