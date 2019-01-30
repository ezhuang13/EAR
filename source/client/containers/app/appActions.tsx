import * as Types from './appTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeApplication = () => {
    return ({
        type: Types.APPLICATION_INITIALIZED
    });
};
