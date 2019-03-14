import * as Types from './registerTypes';

/********** Local State Interface and Initial State Constant **********/
interface RegisterStateLocal {
    registerError: string;
    notify: string;
}
export const initialRegisterState: RegisterStateLocal = {
    registerError: '',
    notify: '',
};

/********** Register Reducer **********/
export const registerReducer = (state = initialRegisterState, action: Types.RegisterActionTypes) => {
    switch (action.type) {
        case Types.REGISTER_FAIL:
            // Return the proper changed state!
            return Object.assign({}, state, {
                registerError: action.error
            });
        case Types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                registerError: '',
                notify: `${action.username} successfully registered.  You will now need to log in.`,
            });
        case Types.PERFORM_REGISTER:
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
