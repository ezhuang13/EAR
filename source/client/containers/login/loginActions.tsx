import * as Types from './loginTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Object Schema Validation for Form!
import * as Schemas from '../../utility/schemas';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeLogin: typeof initializeLogin,
    loginFail?: typeof loginFail,
    loginSuccess?: typeof loginSuccess,
    attemptLogin?: typeof attemptLogin,
    performLogin?: typeof performLogin
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeLogin = () => {
    return ({
        type: Types.LOGIN_INITIALIZED,
        payload: {
            loginInitialized: true
        }
    });
};

export const loginFail = (username: string, error: any) => {
    return({
        type: Types.LOGIN_FAIL,
        payload: {
            status: 'fail',
            username,
            error
        }
    });
};

export const loginSuccess = (username: string) => {
    return({
        type: Types.LOGIN_SUCCESS,
        payload: {
            status: 'success',
            username,
            error: ''
        }
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/
type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Validates the login information against a Joi schema, dispatch the appropriate
// actions bsaed on the results thereof.
export const attemptLogin = (loginInformation: Types.LoginInformation): ThunkActionType => {
        return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            return new Promise<void>((resolve: any) => {

                // Validate result against Login Schema Joi
                const validationStuff = Schemas.performValidation(loginInformation, 'Login');

                // Check the appropriate error codes and what not
                if (validationStuff.error === null) {
                    // No error, thus login information passed client-side validation!
                    // Allow login fetch to actually happen...
                    dispatch(performLogin(loginInformation));
                } else {
                    // Login failed! Dispatch loginFail, find correct error therein!
                    dispatch(loginFail(loginInformation.username, validationStuff.mappedError));
                }

                return resolve({
                    type: Types.ATTEMPT_LOGIN,
                    payload: {
                        status: 'attempting',
                        ...loginInformation
                    }
                });
            });
        };
};

// Actually performs the AJAX request to the server for POSTing the login information, checking to
// see what's good with the entered account.
export const performLogin = (loginInformation: Types.LoginInformation): ThunkActionType => {
        return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
                return new Promise<void>((resolve: any) => {

                    // This is where we put AJAX requests / any type of asynchronous action
                    // for our components. Then, once the action is totally completed,
                    // we return an action type just like every other component (which will
                    // be processed by the reducer and then mutate the store)
                    fetch('/api/v1/users/login', {
                        body: JSON.stringify(loginInformation),
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST'
                    })
                    .then((response: any) => response.json()
                    .then((responseData: any) => ({statusCode: response.status, body: responseData})))
                    .then((responseData) => {
                        // Check the status code for appropriate action!
                        switch (responseData.statusCode) {
                            case 200:
                            case 201:
                                console.log('Successful login, proceed onwards.');
                                console.log(responseData);
                                dispatch(loginSuccess(responseData.body.username));
                                break;
                            case 400:
                            case 401:
                            case 405:
                                console.log('Login failure, try again!');
                                dispatch(loginFail(responseData.body.username, responseData.body.error));
                                break;
                            default:
                                console.log('Unknown status code, should try something else.');
                                break;
                        }
                        return resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                        dispatch(loginFail(loginInformation.username,
                            'Error due to Restful API being under development.'));
                    });
                });
            };
};
