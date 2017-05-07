import axios from 'axios';
import store from '../../store';

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
    FORGOT_PASSWORD_RESET: 'USER/FORGOT_PASSWORD_RESET',
    LOGOUT: 'USER/LOGOUT'
};

let defaultUser = {},
    defaultForgotPassword = {},
    defaultSessionToken = '',
    defaultError = '';

export const initialState = {
    user: defaultUser,
    sessionToken: defaultSessionToken,
    isLoading: false,
    error: defaultError,
    forgotPassword: defaultForgotPassword
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case types.FORGOT_PASSWORD_REQUEST:
        case types.PROFILE_REQUEST:
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: defaultError
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                sessionToken: action.sessionToken
            };
        case types.PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user
            };
        case types.PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: action.error
            };
        case types.LOGOUT:
            return {
                ...state,
                user: defaultUser,
                sessionToken: defaultSessionToken
            };
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forgotPassword: {
                    success: true
                }
            };
        case types.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                forgotPassword: {
                    success: false,
                    email: action.email
                }
            };
        case types.FORGOT_PASSWORD_RESET:
            return {
                ...state,
                forgotPassword: defaultForgotPassword
            };
        default:
            return state
    }
}

export const actions = {
    profile: function(){
        return function (dispatch) {
            dispatch({type: types.PROFILE_REQUEST});
            let currentState = store.getState(),
                sessionToken = currentState.userState.sessionToken;
            return axios({
                method: 'GET',
                url: process.env.REACT_APP_API_URL + '/user/me',
                headers: {'Authorization': 'Bearer ' + sessionToken}
            })
                .then((response) => {
                    dispatch({
                        type: types.PROFILE_SUCCESS,
                        user: response.data
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.PROFILE_FAILURE,
                        error: error.response.status
                    });
                });
        };
    },
    login: function(email, password){
        return function (dispatch) {
            dispatch({type:types.LOGIN_REQUEST});
            return axios({
                method: 'POST',
                url: process.env.REACT_APP_API_URL+'/user/login',
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
                        user: {
                            email:email,
                            password:password
                        },
                        error: error.response.status
                    });
                });
        };
    },
    logout: () => ({ type: types.LOGOUT }),
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
                        type: types.FORGOT_PASSWORD_SUCCESS
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.FORGOT_PASSWORD_FAILURE,
                        email: email
                    });
                });
        };
    },
    forgotPasswordReset: function(){
        return function (dispatch) {
            dispatch({type: types.FORGOT_PASSWORD_RESET});
        }
    }
};