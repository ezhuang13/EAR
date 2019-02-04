/********** Describe the Action Types in Strings **********/
export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';

/********** Interfaces for Redux Actions for the Register Component **********/
interface InitializeApplication {
    type: typeof APPLICATION_INITIALIZED;
    payload: CommonArguments;
}

/********** Interfaces for Objects in the Component **********/

export interface CommonArguments {
    loggedIn?: string;
    username?: string;
    status?: boolean;
    appInitialized?: boolean;
}

/********** Combination of all Redux Actions **********/
export type AppActionTypes =  InitializeApplication;
