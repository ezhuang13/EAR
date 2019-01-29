import * as Types from './loginTypes';

// Describes the shape of Login's slice of state for the Reducer
interface LoginStateLocal {
    loggedIn: boolean;
    pastUsername: string;
    status: string;
    loginInitialized: boolean;
}

export const initialLoginState: LoginStateLocal = {
    loggedIn: false,
    pastUsername: '',
    status: '',
    loginInitialized: false
};

export const loginReducer = (state = initialLoginState, action: Types.LoginActionTypes) => {
    switch (action.type) {
        case Types.LOGIN_INITIALIZED:
            return Object.assign({}, state, {
                loginInitialized: true
            });
        case Types.ATTEMPT_LOGIN:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.LOGIN_FAIL:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.TEST_LOGIN:
            // Note that we can put logic here, so maybe use actions for asynchronous middleware
            // and this for logically processing the server response?
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
};

export type LoginState = ReturnType<typeof loginReducer>;
