import * as Types from './registerTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeRegister,
    registerFail,
    registerSuccess,
    attemptRegister,
    testRegister
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

export const registerFail = (username: Types.CommonArguments) => {
    return({
        type: Types.REGISTER_INITIALIZED,
        payload: {
            status: 'fail',
            username
        }
    });
};

export const registerSuccess = (username: Types.CommonArguments) => {
    return({
        type: Types.REGISTER_SUCCESS,
        payload: {
            status: 'success',
            username
        }
    });
};

export const attemptRegister = (registerInformation: Types.RegisterInformation) => {
    return({
        type: Types.ATTEMPT_REGISTER,
        payload: {
            status: 'attempting',
            ...registerInformation
        }
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
                    fetch('/api/users/create', {
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
                        // Check the status code for appropriate action!
                        switch (responseData.statusCode) {
                            case 200 || 201:
                                console.log('Successful login, proceed onwards.');
                                console.log(responseData);
                                dispatch(registerSuccess(responseData.body.username));
                                break;
                            case 400 || 401:
                                console.log('Login failure, try again!');
                                dispatch(registerFail(responseData.body.username));
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
