import * as Types from './registerTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** Action Creators for the Synchronous Typed Actions **********/
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

/********** Action Creators for Asynchronous Typed Actions **********/
export const testRegister = (registerInformation: Types.RegisterInformation):
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
                        }
                    })
                    .then((response: any) => response.json())
                    .then((data) => {
                        // Data correctly parsed, it's what the server sends!
                        console.log('Register data was sent and responded to.');
                        console.log(data);
                        resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                    })
                });
            };
        };
