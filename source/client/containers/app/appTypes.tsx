/********** Describe the Action Types in Strings **********/
export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';

/********** Interfaces for Redux Actions for the Register Component **********/
interface InitializeApplication {
    type: typeof APPLICATION_INITIALIZED;
    payload: Status;
}

/********** Interfaces for Objects in the App Component **********/
export interface LoggedIn {
    loggedIn: boolean;
    username: string;
}

export interface Status extends LoggedIn {
    status: string;
}

/********** Combination of all Redux Actions **********/
export type AppActionTypes =  InitializeApplication;
