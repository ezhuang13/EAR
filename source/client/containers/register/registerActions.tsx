import * as Types from './registerTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { resolve } from 'path';

export const initializeRegister = () => {
    return ({
        type: Types.REGISTER_INITIALIZED
    });
};

export const registerFail = (username: Types.RegisterUsername) => {
    return({
        type: Types.REGISTER_INITIALIZED,
        status: 'fail',
        username
    });
};

export const registerSuccess = (username: Types.RegisterUsername) => {
    return({
        type: Types.REGISTER_SUCCESS,
        status: 'success',
        username
    });
};

export const attemptRegister = (registerInformation: Types.RegisterInformation) => {
    return({
        type: Types.ATTEMPT_REGISTER,
        status: 'attempting',
        ...registerInformation
    });
};

export const testRegister = (registerInformation: Types.RegisterInformation):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
            Promise<void> => {
                return new Promise<void>(() => {
                    // This is where we put AJAX requests / any type of asynchronous action
                    // for our components. Then, once the action is totally completed,
                    // we return an action type just like every other component (which will
                    // be processed by the reducer and then mutate the store)
                    fetch('/test/' + registerInformation.username, {
                        body: JSON.stringify(registerInformation),
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
                            type: Types.TEST_REGISTER,
                            status: 'attempting',
                            ...registerInformation
                        });
                    });
                });
            };
        };
