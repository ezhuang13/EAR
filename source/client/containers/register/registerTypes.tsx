/********** Describe the Action Types in Strings **********/
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const PERFORM_REGISTER = 'PERFORM_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const INITIALIZE_REGISTER = 'INITIALIZE_REGISTER';

/********** Interfaces for Redux Actions for the Register Component **********/
interface RegisterFail {
    type: typeof REGISTER_FAIL;
    error: any;
}

interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS;
    username: string;
}

interface PerformRegister {
    type: typeof PERFORM_REGISTER;
    payload: RegisterInformation;
}

/********** Interfaces for Objects in the Register Component **********/

export interface RegisterInformation {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

/********** Combination of all Redux Actions **********/
export type RegisterActionTypes = RegisterFail | PerformRegister | RegisterSuccess;
