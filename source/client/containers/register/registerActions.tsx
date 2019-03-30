import * as Types from './registerTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { clientIP } from '../../utility/constants';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    registerFail?: typeof registerFail,
    registerSuccess?: typeof registerSuccess,
    performRegister?: typeof performRegister,
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const registerFail = (error: any) => {
    return({
        type: Types.REGISTER_FAIL,
        error
    });
};

export const registerSuccess = (username: string) => {
    return({
        type: Types.REGISTER_SUCCESS,
        username
    });
};

type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

/********** Action Creators for Asynchronous Typed Actions **********/
export const performRegister = (registerInformation: Types.RegisterInformation):
    ThunkActionType => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
            Promise<void> => {
                return new Promise<void>( async (resolve: any) => {
                    fetch(clientIP + '/users/', {
                        body: JSON.stringify(registerInformation),
                        mode: 'cors',
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
                            case 201:
                                dispatch(registerSuccess(responseData.body.username));
                                break;
                            case 400:
                                dispatch(registerFail(responseData.body.error));
                                break;
                            default:
                                break;
                        }
                        return resolve();
                    })
                    .catch((error) => {
                        // Can do whatever with the error?
                        console.log('See the following error: ', error);
                        dispatch(registerFail('Error due to Restful API being under development.'));
                    });
                });
            };
        };
