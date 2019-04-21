import * as Types from './appTypes';

/********** Local State Interface and Initial State Constant **********/
interface AppPropsInterface {
    loggedIn: boolean;
    currentUser: string;
    status: string;
    appInitialized: boolean;
}

export const initialAppProps: AppPropsInterface = {
    appInitialized: false,
    status: '',
    currentUser: '',
    loggedIn: false
};

/********** Application Reducer **********/
export const appReducer = (state = initialAppProps, action: Types.AppActionTypes) => {
    switch (action.type) {
        case Types.APPLICATION_INITIALIZED:
            return Object.assign({}, state, {
                appInitialized: action.payload.appInitialized
            });
        case Types.SET_USER:
            return Object.assign({}, state, {
                currentUser: action.payload.username,
                loggedIn: true
            });
        case Types.PERFORM_LOGOUT:
            return Object.assign({}, state, {
                loggedIn: false,
                currentUser: ''
            });
        default:
            return state;
    }
};

// Exports the Application Reducer as the Application's State
export type AppProps = ReturnType<typeof appReducer>;
