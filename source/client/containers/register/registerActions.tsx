import * as Types from './registerTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as Schemas from '../../utility/schemas';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeRegister: typeof initializeRegister,
    registerFail: typeof registerFail,
    registerSuccess: typeof registerSuccess,
    attemptRegister: typeof attemptRegister,
    performRegister: typeof performRegister
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeRegister = () => {
    return ({
        type: Types.REGISTER_INITIALIZED,
        payload: {
            registerInitialized: true
        }
    });
};

export const registerFail = (username: string, error: any) => {
    return({
        type: Types.REGISTER_FAIL,
        payload: {
            status: 'fail',
            username,
            error
        }
    });
};

export const registerSuccess = (username: string) => {
    return({
        type: Types.REGISTER_SUCCESS,
        payload: {
            status: 'success',
            username,
            error: ''
        }
    });
};

type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Validates the login information against a Joi schema, dispatch the appropriate
// actions bsaed on the results thereof.
export const attemptRegister = (registerInformation: Types.RegisterInformation): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve: any) => {

            // Validate result against Login Schema Joi
            const validResult = Schemas.performValidation(registerInformation, 'Register');
            // Check the appropriate error codes and what not
            if (validResult.error === null) {
                // No error, thus login information passed client-side validation!
                // Allow login fetch to actually happen...
                dispatch(performRegister(registerInformation));
            } else {
                // Login failed! Dispatch loginFail, find correct error therein!
                dispatch(registerFail(registerInformation.username, validResult.mappedError));
            }

            return resolve({
                type: Types.ATTEMPT_REGISTER,
                payload: {
                    status: 'attempting',
                    ...registerInformation
                }
            });
        });
    };
};

/********** Action Creators for Asynchronous Typed Actions **********/
export const performRegister = (registerInformation: Types.RegisterInformation):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
            Promise<void> => {
                return new Promise<void>( async (resolve: any) => {
                    // This is where we put AJAX requests / any type of asynchronous action
                    // for our components. Then, once the action is totally completed,
                    // we return an action type just like every other component (which will
                    // be processed by the reducer and then mutate the store)
                    fetch('/api/v1/users/', {
                        body: JSON.stringify(registerInformation),
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST'
                    })
                    .then((response: any) => response.json()
                    .then((responseData: any) => ({statusCode: response.status, body: responseData})))
                    .then((responseData) => {
                        console.log('Register through.');
                        // Check the status code for appropriate action!
                        switch (responseData.statusCode) {
                            case 200:
                            case 201:
                                console.log('Successful register, proceed onwards.');
                                dispatch(registerSuccess(responseData.body.username));
                                break;
                            case 400:
                            case 401:
                            case 405:
                                console.log('Registration failure, try again!');
                                dispatch(registerFail(responseData.body.username, responseData.body.error));
                                break;
                            default:
                                console.log('Unhandled status code, try something else.');
                                break;
                        }
                        return resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                        console.log('See the following error: ', error);
                        dispatch(registerFail(registerInformation.username,
                            'Error due to Restful API being under development.'));
                    });
                });
            };
        };
