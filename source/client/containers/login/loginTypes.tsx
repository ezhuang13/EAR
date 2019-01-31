/********** Describe the Action Types in Strings **********/
export const LOGIN_INITIALIZED = 'LOGIN_INITIALIZED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const TEST_LOGIN = 'TEST_LOGIN';

/********** Interfaces for the Actions Creators **********/
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
    payload: LoginInformation;
}

/********** Interfaces for Objects in the Login Component**********/
export interface LoginUsername {
    username: string;
}

export interface Status extends LoginUsername {
    status: string;
}

export interface LoginInformation extends LoginUsername {
    password: string;
}

/********** Combination of all Redux Actions **********/
export type LoginActionTypes = InitializeLogin | LoginFail | LoginSuccess | AttemptLogin | TestLogin;
