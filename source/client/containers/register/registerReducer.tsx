import * as Types from './registerTypes';

/********** Local State Interface and Initial State Constant **********/
interface RegisterStateLocal {
    registerInitialized: boolean;
}
export const initialRegisterState: RegisterStateLocal = {
    registerInitialized: false
};

/********** Register Reducer **********/
export const registerReducer = (state = initialRegisterState, action: Types.RegisterActionTypes) => {
    switch (action.type) {
        case Types.REGISTER_INITIALIZED:
            return Object.assign({}, state, {
                registerInitialized: true
            });
        case Types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.REGISTER_FAIL:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.ATTEMPT_REGISTER:
            return Object.assign({}, state, {
                ...action.payload
            });
        case Types.TEST_REGISTER:
            // Note that we can put logic here, so maybe use actions for asynchronous middleware
            // and this for logically processing the server response?
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
};

// Exports the Register Reducer as the Register's State
export type RegisterState = ReturnType<typeof registerReducer>;
