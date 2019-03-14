import * as Types from './loginTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeLogin: typeof initializeLogin,
    loginFail?: typeof loginFail,
    loginSuccess?: typeof loginSuccess,
    performLogin?: typeof performLogin,
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeLogin = () => {
    return ({
        type: Types.LOGIN_INITIALIZED,
    });
};

export const loginFail = (error: any) => {
    return({
        type: Types.LOGIN_FAIL,
        error
    });
};

export const loginSuccess = (username: string) => {
    return({
        type: Types.LOGIN_SUCCESS,
        username
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/
type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Actually performs the AJAX request to the server for POSTing the login information, checking to
// see what's good with the entered account.
export const performLogin = (loginInformation: Types.LoginInformation): ThunkActionType => {
        return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
                return new Promise<void>((resolve: any) => {
                    // This is where we put AJAX requests / any type of asynchronous action
                    // for our components. Then, once the action is totally completed,
                    // we return an action type just like every other component (which will
                    // be processed by the reducer and then mutate the store)
                    fetch('/users/login', {
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
                            case 201:
                                dispatch(loginSuccess(loginInformation.username));
                                break;
                            case 400:
                                dispatch(loginFail(responseData.body.error));
                                break;
                            default:
                                break;
                        }
                        return resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                        dispatch(loginFail('Error due to Restful API being under development.'));
                    });
                });
            };
};
