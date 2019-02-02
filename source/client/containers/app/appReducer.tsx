import * as Types from './appTypes';

/********** Local State Interface and Initial State Constant **********/
interface AppStateLocal {
    loggedIn: boolean;
    pastUsername: string;
    status: string;
    appInitialized: boolean;
}

export const initialAppState: AppStateLocal = {
    appInitialized: false,
    status: '',
    pastUsername: '',
    loggedIn: false
};

/********** Application Reducer **********/
export const appReducer = (state = initialAppState, action: Types.AppActionTypes) => {
    switch (action.type) {
        case Types.APPLICATION_INITIALIZED:
            return Object.assign({}, state, {
                appInitialized: action.payload.appInitialized
            });
            break;
        default:
            return state;
    }
};

// Exports the Application Reducer as the Application's State
export type AppState = ReturnType<typeof appReducer>;
