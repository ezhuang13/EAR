/********** Describe the Action Types in Strings **********/
export const LOGIN_INITIALIZED = 'LOGIN_INITIALIZED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const TEST_LOGIN = 'TEST_LOGIN';

/********** Interfaces for the Actions Creators **********/
interface InitializeLogin {
    type: typeof LOGIN_INITIALIZED;
    payload: CommonArguments;
}

interface LoginFail {
    type: typeof LOGIN_FAIL;
    payload: CommonArguments;
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: CommonArguments;
}

interface AttemptLogin {
    type: typeof ATTEMPT_LOGIN;
    payload: CommonArguments & LoginInformation;
}

interface TestLogin {
    type: typeof TEST_LOGIN;
    payload: LoginInformation;
}

/********** Interfaces for Arguments to and from Component **********/
export interface CommonArguments {
    status?: string;
    username?: string;
    loginInitialized?: boolean;
}

export interface LoginInformation {
    username: string;
    password: string;
}

/********** Combination of all Redux Actions **********/
export type LoginActionTypes = InitializeLogin | LoginFail | LoginSuccess | AttemptLogin | TestLogin;
