import * as Types from './loginTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeLogin,
    loginFail,
    loginSuccess,
    attemptLogin,
    testLogin
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

export const loginFail = (username: Types.CommonArguments) => {
    return({
        type: Types.LOGIN_FAIL,
        payload: {
            status: 'fail',
            username
        }
    });
};

export const loginSuccess = (username: Types.CommonArguments) => {
    return({
        type: Types.LOGIN_SUCCESS,
        payload: {
            status: 'success',
            username
        }
    });
};

export const attemptLogin = (loginInformation: Types.LoginInformation) => {
    return({
        type: Types.ATTEMPT_LOGIN,
        payload: {
            status: 'attempting',
            ...loginInformation
        }
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/
export const testLogin = (loginInformation: Types.LoginInformation):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
            Promise<void> => {
                return new Promise<void>( (resolve: any) => {
                    // This is where we put AJAX requests / any type of asynchronous action
                    // for our components. Then, once the action is totally completed,
                    // we return an action type just like every other component (which will
                    // be processed by the reducer and then mutate the store)
                    fetch('/test/' + loginInformation.username, {
                        body: JSON.stringify(loginInformation),
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST'
                    })
                    .then((response: any) => {
                        return {
                            ...response.json(),
                            statusCode: response.status
                        };
                    })
                    .then((responseData) => {
                        // Check the status code for appropriate action!
                        switch (responseData.statusCode) {
                            case 200 || 201:
                                console.log('Successful login, proceed onwards.');
                                dispatch(loginSuccess(responseData.username));
                                break;
                            case 400 || 401:
                                console.log('Login failure, try again!');
                                dispatch(loginFail(responseData.username));
                                break;
                        }
                        return resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                        console.error('There was an error, see this: ');
                        console.error(error);
                    });
                });
            };
};
