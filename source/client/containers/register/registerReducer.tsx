import * as Types from './registerTypes';

interface RegisterStateLocal {
    registerInitialized: boolean;
}
export const initialRegisterState: RegisterStateLocal = {
    registerInitialized: false
};

export const registerReducer = (state = initialRegisterState, action: Types.RegisterActionTypes) => {
    switch (action.type) {
        case Types.REGISTER_INITIALIZED:
            return Object.assign({}, state, {
                loginInitialized: true
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

export type RegisterState = ReturnType<typeof registerReducer>;
