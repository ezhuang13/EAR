/********** Describe the Action Types in Strings **********/
export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';
export const SET_USER = 'SET_USER';
export const PERFORM_LOGOUT = 'PERFORM_LOGOUT';

/********** Interfaces for Redux Actions for the Register Component **********/
interface InitializeApplication {
    type: typeof APPLICATION_INITIALIZED;
    payload: CommonArguments;
}

interface SetUser {
    type: typeof SET_USER;
    payload: CommonArguments;
}

interface PerformLogout {
    type: typeof PERFORM_LOGOUT;
}
/********** Interfaces for Objects in the Component **********/

export interface CommonArguments {
    loggedIn?: string;
    username?: string;
    status?: boolean;
    appInitialized?: boolean;
}

/********** Combination of all Redux Actions **********/
export type AppActionTypes =  InitializeApplication | SetUser | PerformLogout;
