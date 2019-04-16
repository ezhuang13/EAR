import * as Types from './loginTypes';

/********** Login State Interface and Initial State Constant **********/
export interface LoginStateInterface {
    loginError: string;
    notify: string;
    attemptedUser: string;
}

export const initialLoginState: LoginStateInterface = {
    loginError: '',
    notify: '',
    attemptedUser: '',
};

/********** Login Reducer **********/
export const loginReducer = (state = initialLoginState, action: Types.LoginActionTypes) => {
    switch (action.type) {
        case Types.LOGIN_INITIALIZED:
            return Object.assign({}, state, {
                notify: '',
                loginError: '',
            });
        case Types.LOGIN_FAIL:
            // Return the proper changed state!
            return Object.assign({}, state, {
                loginError: action.error,
            });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loginError: '',
                notify: 'Successfully logged in. Redirecting to profile page.',
                attemptedUser: action.username
            });
        case Types.PERFORM_LOGIN:
            // Note that we can put logic here, so maybe use actions for asynchronous middleware
            // and this for logically processing the server response?
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
};

// Exports the Login Reducer as the Login's State
export type LoginState = ReturnType<typeof loginReducer>;
