/********** Describe the Action Types in Strings **********/
export const LOGIN_INITIALIZED = 'LOGIN_INITIALIZED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const PERFORM_LOGIN = 'PERFORM_LOGIN';

/********** Interfaces for the Actions Creators **********/
interface InitializeLogin {
    type: typeof LOGIN_INITIALIZED;
}

interface LoginFail {
    type: typeof LOGIN_FAIL;
    error: any;
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    username: string;
}

interface PerformLogin {
    type: typeof PERFORM_LOGIN;
    payload: LoginInformation;
}

/********** Interfaces for Arguments to and from Component **********/
export interface LoginInformation {
    username: string;
    password: string;
}

/********** Combination of all Redux Actions **********/
export type LoginActionTypes = InitializeLogin | LoginFail | LoginSuccess | PerformLogin;
