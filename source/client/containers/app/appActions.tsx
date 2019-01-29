import * as Types from './appTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const initializeApplication = () => {
    return ({
        type: Types.APPLICATION_INITIALIZED
    });
};
