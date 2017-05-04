import { browserHistory } from 'react-router';
import { errorHandler } from './helpers';

export const types = {
    AUTO_LOGIN: 'AUTH/AUTH_AUTO_LOGIN',
    SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
    SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
    LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
    LOGOUT: 'AUTH/LOGOUT'
};

export const initialState = {
    user: {},
    isLoading: false,
    error: null
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_REQUEST:
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case types.SIGNUP_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user
            };
        case types.SIGNUP_FAILURE:
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
                user: null
            };
        default:
            return state
    }
}

export const actions = {
    signup: (email, password) => ({ type: types.SIGNUP_REQUEST, email, password }),
    login: function(email, password){
        return function (dispatch) {
            dispatch({type:types.LOGIN_REQUEST});
            return fetch(process.env.REACT_APP_API_URL+'/login?noredirect=true',{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(errorHandler)
                .then((response) => {
                    console.log('LOGIN', response);
                    return fetch(process.env.REACT_APP_API_URL+'/profile',{
                        method: 'GET',
                        credentials: 'include'
                    })
                        .then(errorHandler)
                        .then((responseJson)=>{
                            console.log('PROFILE',responseJson);
                            dispatch({
                                type: types.LOGIN_SUCCESS,
                                user: {
                                    email:email,
                                    password:password
                                }
                            });
                            return browserHistory.push('dashboard');
                        });
                })
                .catch((error) => {
                    console.log('ERROR',error);
                    dispatch({
                        type: types.LOGIN_FAILURE,
                        user: {
                            email:email,
                            password:password
                        },
                        error: error
                    });
                });
        }
    },
    logout: () => ({ type: types.LOGOUT })
};