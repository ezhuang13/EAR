import * as Types from './loginTypes';

/********** Login State Interface and Initial State Constant **********/
export interface LoginStateInterface {
    loggedIn: boolean;
    pastUsername: string;
    status: string;
    loginInitialized: boolean;
    loginError: string;
}

export const initialLoginState: LoginStateInterface = {
    loggedIn: false,
    pastUsername: '',
    status: '',
    loginInitialized: false,
    loginError: ''
};

/********** Login Reducer **********/
export const loginReducer = (state = initialLoginState, action: Types.LoginActionTypes) => {
    switch (action.type) {
        case Types.LOGIN_INITIALIZED:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.ATTEMPT_LOGIN:
            return Object.assign({}, state, {
                pastUsername: action.payload.username,
                status: action.payload.status
            });
        case Types.LOGIN_FAIL:
            // Return the proper changed state!
            return Object.assign({}, state, {
                pastUsername: action.payload.username,
                status: action.payload.status,
                loginError: action.payload.error
            });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                pastUsername: action.payload.username,
                status: action.payload.status,
                loginError: action.payload.error
            });
        case Types.PERFORM_LOGIN:
            // Note that we can put logic here, so maybe use actions for asynchronous middleware
            // and this for logically processing the server response?
            return Object.assign({}, state, {
                pastUsername: action.payload.username
            });
        default:
            return state;
    }
};

// Exports the Login Reducer as the Login's State
export type LoginState = ReturnType<typeof loginReducer>;
