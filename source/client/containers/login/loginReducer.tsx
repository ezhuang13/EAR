import * as Types from './loginTypes';

/********** Login Reducer **********/
export const loginReducer = (state = Types.initialLoginState, action: Types.LoginActionTypes) => {
    switch (action.type) {
        case Types.LOGIN_INITIALIZED:
            return Object.assign({}, state, {
                ...action.payload
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

// Exports the Login Reducer as the Login's State
export type LoginState = ReturnType<typeof loginReducer>;
