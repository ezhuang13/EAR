/********** Describe the Action Types in Strings **********/
export const REGISTER_INITIALIZED = 'REGISTER_INITIALIZED';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ATTEMPT_REGISTER = 'ATTEMPT_REGISTER';
export const TEST_REGISTER = 'TEST_REGISTER';

/********** Interfaces for Redux Actions for the Register Component **********/
interface InitializeRegister {
    type: typeof REGISTER_INITIALIZED;
    payload: Status;
}

interface RegisterFail {
    type: typeof REGISTER_FAIL;
    payload: Status;
}

interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS;
    payload: Status;
}

interface AttemptRegister {
    type: typeof ATTEMPT_REGISTER;
    payload: Status;
}

interface TestRegister {
    type: typeof TEST_REGISTER;
    payload: RegisterInformation;
}

/********** Interfaces for Objects in the Register Component **********/
export interface Status extends RegisterUsername {
    status: string;
}

export interface RegisterUsername {
    username: string;
}

export interface RegisterInformation extends RegisterUsername {
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

/********** Combination of all Redux Actions **********/
export type RegisterActionTypes = InitializeRegister | RegisterFail | RegisterSuccess | AttemptRegister | TestRegister;
