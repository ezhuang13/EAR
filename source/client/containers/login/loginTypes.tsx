// Describes the different Action types!
export const LOGIN_INITIALIZED = 'LOGIN_INITIALIZED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const TEST_LOGIN = 'TEST_LOGIN';

// Interfaces for the different actions and payloads
interface InitializeLogin {
    type: typeof LOGIN_INITIALIZED;
    payload: Status;
}

interface LoginFail {
    type: typeof LOGIN_FAIL;
    payload: Status;
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: Status;
}

interface AttemptLogin {
    type: typeof ATTEMPT_LOGIN;
    payload: Status;
}

interface TestLogin {
    type: typeof TEST_LOGIN;
    payload: LoggingIn;
}

// Interfaces for payload / incoming information
export interface LoginUsername {
    username: string;
}

export interface Status extends LoginUsername {
    status: string;
}

export interface LoggingIn extends LoginUsername {
    password: string;
}

export interface LoginInformation {
    username: LoginUsername;
    password: string;
}

export type LoginActionTypes = InitializeLogin | LoginFail | LoginSuccess | AttemptLogin | TestLogin;
