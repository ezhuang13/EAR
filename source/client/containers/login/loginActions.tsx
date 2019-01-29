import * as Types from './loginTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

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

export const testLogin = (loginInformation: Types.LoginInformation):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
            Promise<void> => {
                return new Promise<void>((resolve) => {
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
                    }).then(() => {
                        resolve();

                        // TODO: Change return action for either success or failure based on
                        // server response. Can dispatch other actions as well!!
                        return ({
                            type: Types.TEST_LOGIN,
                            status: 'attempting',
                            ...loginInformation
                        });
                    });
                });
            };
};
