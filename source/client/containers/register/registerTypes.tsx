// Describes the different Action types!
export const REGISTER_INITIALIZED = 'REGISTER_INITIALIZED';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ATTEMPT_REGISTER = 'ATTEMPT_REGISTER';
export const TEST_REGISTER = 'TEST_REGISTER';

// Interfaces for the different actions and payloads
interface InitializeRegister {
    type: typeof REGISTER_INITIALIZED;
    payload: Combined;
}

interface RegisterFail {
    type: typeof REGISTER_FAIL;
    payload: Combined;
}

interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS;
    payload: Combined;
}

interface AttemptRegister {
    type: typeof ATTEMPT_REGISTER;
    payload: Combined;
}

interface TestRegister {
    type: typeof TEST_REGISTER;
    payload: Registering;
}

// Interfaces for payload / incoming information
export interface RegisterUsername {
    username: string;
}

export interface Registering extends RegisterUsername {
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface Status {
    status: string;
}

export type Combined = RegisterUsername & Status;

export interface RegisterInformation {
    username: RegisterUsername;
    password: string;
}

export type RegisterActionTypes = InitializeRegister | RegisterFail | RegisterSuccess | AttemptRegister | TestRegister;
