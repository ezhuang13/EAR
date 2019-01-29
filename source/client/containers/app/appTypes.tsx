export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';

// Interfaces for the different actions and payloads
interface InitializeApplication {
    type: typeof APPLICATION_INITIALIZED;
    payload: Status;
}

// Interfaces for payload / incoming information
export interface LoggedIn {
    loggedIn: boolean;
    username: string;
}

export interface Status extends LoggedIn {
    status: string;
}

export type AppActionTypes =  InitializeApplication;
