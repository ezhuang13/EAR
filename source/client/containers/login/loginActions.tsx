import * as Types from './loginTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeLogin = () => {
    return ({
        type: Types.LOGIN_INITIALIZED
    });
};

export const loginFail = (username: Types.LoginUsername) => {
    return({
        type: Types.LOGIN_FAIL,
        status: 'fail',
        username
    });
};

export const loginSuccess = (username: Types.LoginUsername) => {
    return({
        type: Types.LOGIN_SUCCESS,
        status: 'success',
        username
    });
};

export const attemptLogin = (loginInformation: Types.LoginInformation) => {
    return({
        type: Types.ATTEMPT_LOGIN,
        status: 'attempting',
        ...loginInformation
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
                    .then((response: any) => response.json())
                    .then((data) => {
                        // Data correctly parsed, it's what the server sends!
                        console.log('Login data was sent and responded to.');
                        console.log(data);
                        resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                    });;
                });
            };
};
